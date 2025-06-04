import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsDateString } from 'class-validator';

export class UpdateBookDto {

    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsBoolean()
    @Type(() => Boolean)
    isAvailable: boolean;
}
