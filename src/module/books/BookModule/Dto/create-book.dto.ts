import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class CreateBookDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    author: string;

    @IsOptional()
    publishedDate?: string;  // <- string type for date strings

    @IsOptional()
    genre?: string;

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isAvailable: boolean;
}
