// import { HttpException, Injectable } from '@nestjs/common';
import { Injectable } from '@nestjs/common'
import { CreateBookDto } from './Dto/create-book.dto';
import { UpdateBookDto } from './Dto/update-book.dto';

import { Book } from './book.entity';
import { SortBy } from './book.controller';
@Injectable()
export class BookService {
    public books: Book[] = [];

    addBook(book: CreateBookDto): string {
        const newBook = new Book(
            book.author,
            book.genre,
            book.isAvailable,
            book.publishedDate,
            book.title,
        );

        this.books.push(newBook);

        return 'Book added successfully';
    }


    updateBook(updatebid: string, book: UpdateBookDto): string {

        // const index = this.books.findIndex((b) => b.id === book.id);
        const obj = this.books.find((b) => b.id === updatebid);
        if (!obj)
            return 'there is No any book with this id';
        obj.title = book.title;
        obj.author = book.author;
        obj.genre = book.genre;
        obj.isAvailable = book.isAvailable;
        obj.publishedDate = book.publishedDate;

        return 'Book updated successfully';
        // return new BookNotFoundException('there is No any book is with id', 500); /// class add krke exception
    }

    deleteBook(bookid: string): string {

        const originalLength = this.books.length;
        this.books = this.books.filter((book) => book.id !== bookid);

        if (this.books.length === originalLength) {
             return 'there is No any book with this id';
        }
        return 'Book successfully deleted';
    }
}
