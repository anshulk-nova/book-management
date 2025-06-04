import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './Dto/create-book.dto';
import { UpdateBookDto } from './Dto/update-book.dto';
import { Book, BookDocument } from './book.schema';  // Import Mongoose schema and type

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  // Add a book to MongoDB
  async addBook(bookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(bookDto);
    return await createdBook.save();
  }

  // Update book by ID
  async updateBook(id: string, bookDto: UpdateBookDto): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(id, bookDto, { new: true }).exec();
  }

  // Delete book by ID
  async deleteBook(id: string): Promise<{ deleted: boolean }> {
    const result = await this.bookModel.deleteOne({ _id: id }).exec();
    return { deleted: result.deletedCount === 1 };
  }

  // Optional: find book by ID
  async getBookById(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }

  // Optional: get all books
  async getAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
}
