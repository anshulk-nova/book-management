import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookStatsDocument = BookStats & Document;

@Schema()
export class BookStats {
  @Prop({ default: 0 }) totalAdded: number;
  @Prop({ default: 0 }) totalUpdated: number;
  @Prop({ default: 0 }) totalDeleted: number;

  @Prop({ default: 0 }) titleUpdates: number;
  @Prop({ default: 0 }) authorUpdates: number;
  @Prop({ default: 0 }) genreUpdates: number;
  @Prop({ default: 0 }) availabilityUpdates: number;
  @Prop({ default: 0 }) publishedDateUpdates: number;
}

export const BookStatsSchema = SchemaFactory.createForClass(BookStats);
