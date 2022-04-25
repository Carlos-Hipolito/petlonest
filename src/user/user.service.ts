import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schema } from 'inspector';
import {Model} from 'mongoose';
import { User } from './entities/user.entity';
const bcrypt = require('bcryptjs')

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>){}

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
