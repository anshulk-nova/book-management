import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookModule } from './module/books/BookModule/book.module';
import { UserBookModule } from './module/user-book/UserBookModule/user-book.module';
import { UserModule } from './module/users/UserModule/user.module';  

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://anshul:anshul9999@cluster0.gkjz4qi.mongodb.net/',
    ),
    BookModule,
    UserModule,
    UserBookModule,
  ],
})
export class AppModule {}
