// src/module/UsersModule/user.controller.ts
import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async addUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    const user = await this.userService.findByUserId(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
