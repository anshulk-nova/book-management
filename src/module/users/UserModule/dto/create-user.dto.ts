// src/module/UsersModule/dto/create-user.dto.ts
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
