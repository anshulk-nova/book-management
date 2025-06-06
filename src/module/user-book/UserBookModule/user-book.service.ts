import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserBook, UserBookDocument } from './user-book.schema';
import { CreateUserBookDto } from './dto/create-user-book.dto';

@Injectable()
export class UserBookService {
  constructor(
    @InjectModel(UserBook.name)
    private readonly userBookModel: Model<UserBookDocument>,
  ) {}

  // Add user-book access entry
  async addUserBook(dto: CreateUserBookDto): Promise<UserBook> {
    try {
      const created = new this.userBookModel(dto);
      return await created.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('This user already accessed the book.');
      }
      throw err;
    }
  }

  // Get all userIds who accessed a specific book
  async getUsersByBook(bookId: string): Promise<string[]> {
    const records = await this.userBookModel.find({ bookId }).select('userId');
    return records.map((r) => r.userId);
  }

  // Count of users who accessed a book
  async getBookReadCount(bookId: string): Promise<{ bookId: string; readers: number }> {
    const count = await this.userBookModel.countDocuments({ bookId });
    return { bookId, readers: count };
  }

  // Get raw bookId list accessed by a user
  async getBooksByUser(userId: string): Promise<string[]> {
    const records = await this.userBookModel.find({ userId }).select('bookId');
    return records.map((r) => r.bookId);
  }

  //  Main function: Get detailed book info accessed by a user
  async getDetailedBooksByUser(userId: string): Promise<any[]> {
    return await this.userBookModel.aggregate([
      {
        $match: { userId }
      },
      {
        // Convert bookId string to ObjectId for the lookup
        $addFields: {
          bookObjectId: { $toObjectId: '$bookId' }
        }
      },
      {
        $lookup: {
          from: 'books',               // MongoDB collection name
          localField: 'bookObjectId',  // use converted ObjectId field
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      { $unwind: '$bookDetails' },
      {
        $project: {
          _id: 0,
          bookId: '$bookDetails._id',
          title: '$bookDetails.title',
          author: '$bookDetails.author'
        }
      }
    ]);
  }
}
