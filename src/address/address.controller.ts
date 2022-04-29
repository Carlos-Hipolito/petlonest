import { Body, Controller, Delete, Get, Post, Req, UseGuards, Param, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { Request } from 'express';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: Request, @Body() address: Address){
    return this.addressService.create(req.headers.authorization, address)
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req: Request){
    return this.addressService.findAll(req.headers.authorization)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Req() req: Request, @Param('id') addressid: string){ 
    return this.addressService.delete(req.headers.authorization, addressid)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Req() req: Request, @Param('id') addressid: string, @Body() address: Address){
    return this.addressService.update(req.headers.authorization, address, addressid)
  }

}
