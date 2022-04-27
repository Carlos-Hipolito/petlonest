import { HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { User } from './entities/user.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { verify } from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';
const bcrypt = require('bcryptjs')
import {Pet} from '../pet/entities/pet.entity'
require('dotenv').config()

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>, @InjectModel('Pet') private readonly petModel: Model<Pet>){}

  async findOne(token: string){
    const [, jwt] = token.split(" ")
    const userid = verify(jwt,process.env.secretkey)
    return await this.userModel.findById(userid.sub, '-password')
  }

  async create(user: User) {
    user.password = await bcrypt.hash(user.password, 8)
    await this.userModel.create(user)
    return ({message: "user created"});
  }

  async update(user: User, token: string) {
    const [, jwt] = token.split(" ")
    const userid = verify(jwt,process.env.secretkey)
    user.password = await bcrypt.hash(user.password, 8)
    await this.userModel.findByIdAndUpdate(userid.sub, user)
    return ({message: `User ${userid.sub} updated.`});
  }

  async remove(token: string) {
    const [, jwt] = token.split(" ")
    const userid = verify(jwt,process.env.secretkey)
    await this.petModel.deleteMany({user_id: userid.sub})
    await this.userModel.findByIdAndDelete(userid.sub)
    return ({message: `User ${userid.sub} deleted.`});
  }
}
