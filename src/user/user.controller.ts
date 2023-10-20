import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { JwtGuard } from './guard';
import { ReadUser } from './decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  readMe(@ReadUser() user: User) {
    return user;
  }
}
