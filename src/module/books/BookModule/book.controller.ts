import { Body, Controller, Delete, Get, Param, Post, Patch, Put, Query } from '@nestjs/common';

import { BookService } from './book.service';
import { CreateBookDto } from './Dto/create-book.dto';

import { UpdateBookDto } from './Dto/update-book.dto';

export enum SortBy {
    TITLE = 'title',
    AUTHOR = 'author',
    PUBLISHED_DATE = 'publishedDate',
}

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) { }
    
    // @Query('isAvailable', ParseBoolPipe) isAvailable?: boolean,
    @Put('/book')
    addBook(@Body() book: CreateBookDto): string {
        return this.bookService.addBook(book);
    }

    @Patch('/book')
    updateBook(@Body() book: UpdateBookDto, @Param('id') updatebookid: string): string {

        return this.bookService.updateBook(updatebookid, book);
    }

    @Delete('/book')
    deleteBook(@Param('id') bookId: string): string {
        return this.bookService.deleteBook(bookId);
    }
}
