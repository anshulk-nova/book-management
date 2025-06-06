// src/user-book/user-book.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserBookDocument = UserBook & Document;

@Schema({ timestamps: true })
export class UserBook {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  bookId: string;
}

export const UserBookSchema = SchemaFactory.createForClass(UserBook);

// Add unique compound index to prevent duplicate mappings
UserBookSchema.index({ userId: 1, bookId: 1 }, { unique: true });
