import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserBookController } from './user-book.controller';
import { UserBookService } from './user-book.service';
import { UserBook, UserBookSchema } from './user-book.schema';

import { Book, BookSchema } from '../../books/BookModule/book.schema'; // adjust path if needed
import { BookModule } from '../../books/BookModule/book.module'; // for reuse

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserBook.name, schema: UserBookSchema },
      { name: Book.name, schema: BookSchema }, // 👈 necessary for $lookup
    ]),
    BookModule, // 👈 reusing BookService if needed in aggregation logic
  ],
  controllers: [UserBookController],
  providers: [UserBookService],
  exports: [UserBookService],
})
export class UserBookModule {}
