import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: UserModel): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.getUserById(id);
  }
}
