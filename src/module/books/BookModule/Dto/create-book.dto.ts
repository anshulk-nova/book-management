import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean, IsDateString } from 'class-validator';
export class CreateBookDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    author: string;

    @IsDateString()
    publishedDate: Date;

    @IsString()
    genre: string;

    @IsBoolean()
    @Type(() => Boolean)
    isAvailable: boolean;
}
