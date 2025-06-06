import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { BookService } from './book.service';
// import { CreateBookDto } from './dto/create-book.dto';  // lowercase folder dto
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.schema';
import { BookStats } from './book-stats.schema';

@Controller('/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/add')
  async addBook(@Body() bookDto: CreateBookDto): Promise<Book> {
    return this.bookService.addBook(bookDto);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() bookDto: UpdateBookDto,
  ): Promise<Book> {
    const updated = await this.bookService.updateBook(id, bookDto);
    if (!updated) throw new NotFoundException(`Book with id ${id} not found`);
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBook(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.bookService.deleteBook(id);
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  // This route must come BEFORE @Get(':id')
  @Get('stats/global')
  async getBookStats(): Promise<BookStats> {
    const stats = await this.bookService.getStats();
    if (!stats) {
      throw new NotFoundException('Book statistics not found');
    }
    return stats;
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    const book = await this.bookService.getBookById(id);
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }
}
