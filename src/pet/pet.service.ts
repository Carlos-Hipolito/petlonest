import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './entities/pet.entity';
import {Model} from 'mongoose';
import { verify } from 'jsonwebtoken';
const mongoose = require('mongoose')

@Injectable()
export class PetService {
  constructor(@InjectModel('Pet') private readonly petModel: Model<Pet>){}



  async create(token: string, pet: Pet) {
    const [, jwt] = token.split(" ")
    const userid = verify(jwt,process.env.secretkey)
    pet.user_id = mongoose.Types.ObjectId(userid.sub)
    console.log(pet.user_id)
    await this.petModel.create(pet)
    return ({message: "Pet created."});
  }

  async findAll(token: string) {
    const [, jwt] = token.split(" ")
    const userid = verify(jwt,process.env.secretkey)
    const pets = await this.petModel.find({user_id: userid.sub})

    if (pets.length == 0){
      return ({message: "This user has no pets."})
    }
    return pets
  }

  async update(token: string, petid: string, pet: Pet) {
    const [, jwt] = token.split(" ")
    const userid = verify(jwt,process.env.secretkey);
    const newPet = await this.petModel.findByIdAndUpdate({user_id: userid.sub, _id: petid}, pet)
    if (!newPet){
      return ({error: "This pet don't exist or this is not your pet."})
    }

    return ({message: `Pet ${newPet.name} updated.`})
  }

  async delete(token: string, petid: string) {
    const [, jwt] = token.split(" ")
    const userid = verify(jwt,process.env.secretkey)
    const pet = await this.petModel.findOneAndDelete({user_id: userid.sub, _id: petid})
    if (!pet){
      throw new HttpException("This pet don't exist", HttpStatus.NO_CONTENT)
    }
    return ({message: `Pet ${pet.name} deleted`});
  }
}
