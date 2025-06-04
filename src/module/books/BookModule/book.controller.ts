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
} from '@nestjs/common';

import { BookService } from './book.service';
import { CreateBookDto } from './Dto/create-book.dto';
import { UpdateBookDto } from './Dto/update-book.dto';
import { Book } from './book.schema';
import { NotFoundException } from '@nestjs/common';


@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // Create a new book
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addBook(@Body() bookDto: CreateBookDto): Promise<Book> {
    return this.bookService.addBook(bookDto);
  }

  // Update a book by ID
@Patch(':id')
async updateBook(
  @Param('id') id: string,
  @Body() bookDto: UpdateBookDto,
): Promise<Book> {
  const updated = await this.bookService.updateBook(id, bookDto);
  if (!updated) throw new NotFoundException(`Book with id ${id} not found`);
  return updated;
}


  // Delete a book by ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBook(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.bookService.deleteBook(id);
  }

  // Get all books
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  // Get a specific book by ID
  @Get(':id')
async getBookById(@Param('id') id: string): Promise<Book> {
  const book = await this.bookService.getBookById(id);
  if (!book) throw new NotFoundException(`Book with id ${id} not found`);
  return book;
}

}
