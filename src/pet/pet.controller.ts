import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Req() req: Request, @Body() pet: Pet) {
    return this.petService.create(req.headers.authorization, pet);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req: Request) {
    return this.petService.findAll(req.headers.authorization);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') petid: string, @Body() pet: Pet, @Req() req: Request) {
    return this.petService.update(req.headers.authorization, petid, pet);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.petService.remove(req.headers.authorization, id);
  }
}
