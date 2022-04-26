import { Controller, Get, Post, Body, Patch, Param, Delete, Req} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Request } from 'express';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get()
  findOne(@Req() request: Request) {
    return this.userService.findOne(request.headers.authorization)
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User) {
    return this.userService.update(id, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
