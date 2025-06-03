import { v4 as uuidv4 } from 'uuid';

export class Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    publishedDate: Date;
    isAvailable: boolean;

    constructor(
        bookauthor: string,
        bookgenre: string,
        bookavailable: boolean,
        bookpublisheddate: Date,
        booktitle: string,
    ) {
        this.id = uuidv4();
        this.author = bookauthor;
        this.genre = bookgenre;
        this.isAvailable = bookavailable;
        this.publishedDate = bookpublisheddate;
        this.title = booktitle;
    }


}
