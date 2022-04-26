import { HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schema } from 'inspector';
import {Model} from 'mongoose';
import { User } from './entities/user.entity';
import { request, Request } from 'express';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import {ExtractJwt} from 'passport-jwt'
import { verify } from 'jsonwebtoken';
const bcrypt = require('bcryptjs')
require('dotenv').config()

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>){}

  @UseGuards(JwtStrategy)
  async findOne(token: string){
    const [, jwt] = token.split(" ")
    const userid = verify(jwt,process.env.secretkey)
    return await this.userModel.findById(userid.sub)
  }

  async create(user: User) {
    user.password = await bcrypt.hash(user.password, 8)
    await this.userModel.create(user)
    return ({message: "user created"});
  }

  async update(id: string, user: User) {
    user.password = await bcrypt.hash(user.password, 8)
    await this.userModel.findByIdAndUpdate(id, user)
    return ({message: `user #${id} updated`});
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id)
    return ({message: `user #${id} deleted`});
  }
}
