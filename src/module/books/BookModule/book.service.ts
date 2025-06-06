import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './book.schema';
import { BookStats, BookStatsDocument } from './book-stats.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(BookStats.name) private statsModel: Model<BookStatsDocument>,
  ) {}

  async addBook(bookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(bookDto);
    await createdBook.save();

    await this.statsModel.updateOne(
      {},
      { $inc: { totalAdded: 1 } },
      { upsert: true },
    );

    return createdBook;
  }

  async updateBook(id: string, bookDto: UpdateBookDto): Promise<Book> {
    const existingBook = await this.bookModel.findById(id);
    if (!existingBook) throw new NotFoundException('Book not found');

    const updateCounts: Record<string, number> = {};

    if (bookDto.title && bookDto.title !== existingBook.title) {
      updateCounts.titleUpdateCount = 1;
    }
    if (bookDto.author && bookDto.author !== existingBook.author) {
      updateCounts.authorUpdateCount = 1;
    }
    if (bookDto.genre && bookDto.genre !== existingBook.genre) {
      updateCounts.genreUpdateCount = 1;
    }
    if (
      typeof bookDto.isAvailable === 'boolean' &&
      bookDto.isAvailable !== existingBook.isAvailable
    ) {
      updateCounts.isAvailableUpdateCount = 1;
    }
    if (
      bookDto.publishedDate &&
      new Date(bookDto.publishedDate).getTime() !== new Date(existingBook.publishedDate).getTime()
    ) {
      updateCounts.publishedDateUpdateCount = 1;
    }

    const updatedBook = await this.bookModel.findByIdAndUpdate(id, bookDto, { new: true }).exec();

    if (updatedBook) {
      await this.statsModel.updateOne(
        {},
        {
          $inc: {
            totalUpdated: 1,
            ...updateCounts,
          },
        },
        { upsert: true },
      );
    }

    return updatedBook!;
  }

  async deleteBook(id: string): Promise<{ deleted: boolean }> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();

    if (result) {
      await this.statsModel.updateOne({}, { $inc: { totalDeleted: 1 } }, { upsert: true });
    }

    return { deleted: !!result };
  }

  async getBookById(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getStats(): Promise<BookStats | null> {
    return this.statsModel.findOne().exec();
  }
}
