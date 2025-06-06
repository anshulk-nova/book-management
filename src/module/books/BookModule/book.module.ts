import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookController } from './book.controller';
import { BookService } from './book.service';

import { Book, BookSchema } from './book.schema';
import { BookStats, BookStatsSchema } from './book-stats.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: BookStats.name, schema: BookStatsSchema },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService, MongooseModule], // exported so UserBookModule or others can reuse Book model if needed
})
export class BookModule {}
