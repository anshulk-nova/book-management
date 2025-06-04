import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './module/books/BookModule/book.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://anshul:anshul9999@cluster0.gkjz4qi.mongodb.net/bookdb?retryWrites=true&w=majority'),
    BookModule,
  ],
})
export class AppModule {}
