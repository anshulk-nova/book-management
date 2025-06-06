// src/user-book/user-book.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { CreateUserBookDto } from './dto/create-user-book.dto';

@Controller('user-book')
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}

  // POST /user-book
  @Post()
  async addUserBook(@Body() dto: CreateUserBookDto) {
    return this.userBookService.addUserBook(dto);
  }

  // GET /user-book/book/:bookId/users
  @Get('book/:bookId/users')
  async getUsersByBook(@Param('bookId') bookId: string) {
    return this.userBookService.getUsersByBook(bookId);
  }

  // GET /user-book/book/:bookId/count
  @Get('book/:bookId/count')
  async getReadCount(@Param('bookId') bookId: string) {
    return this.userBookService.getBookReadCount(bookId);
  }

  // GET /user-book/user/:userId/books
  @Get('user/:userId/books')
  async getBooksByUser(@Param('userId') userId: string) {
    return this.userBookService.getBooksByUser(userId);
  }

  // ✅ GET /user-book/user/:userId/books/details
  @Get('user/:userId/books/details')
  async getDetailedBooksByUser(@Param('userId') userId: string) {
    return this.userBookService.getDetailedBooksByUser(userId);
  }
}
