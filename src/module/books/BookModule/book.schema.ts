import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  // @Prop({ required: true })
  // id: string;  // Explicitly setting _id for manual string identifiers like "nova"

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  genre: string;

  @Prop()
  isAvailable: boolean;

  @Prop()
  publishedDate: Date;

  // Field-level update counters
  @Prop({ default: 0 })
  titleUpdateCount: number;

  @Prop({ default: 0 })
  authorUpdateCount: number;

  @Prop({ default: 0 })
  genreUpdateCount: number;

  @Prop({ default: 0 })
  isAvailableUpdateCount: number;

  @Prop({ default: 0 })
  publishedDateUpdateCount: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
