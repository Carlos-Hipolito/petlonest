import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './entities/address.entity';
import { Model } from 'mongoose'
import { verify } from 'jsonwebtoken';
const mongoose = require('mongoose')

@Injectable()
export class AddressService {
    constructor(@InjectModel('Address') private readonly addressModel: Model<Address>){}


    async create(token: string, address: Address){
        const [, jwt] = token.split(" ")
        const userid = verify(jwt,process.env.secretkey)
        address.user_id = mongoose.Types.ObjectId(userid.sub)
        await this.addressModel.create(address)
        return ({message: 'Address created'})
    }

    async findAll(token: string){
        const [, jwt] = token.split(" ");
        const userid = verify(jwt, process.env.secretkey)
        const addresses = await this.addressModel.find({user_id: userid.sub})
        if (addresses.length == 0){
            return {message: "This user don't have any addresses."}
        }
        return addresses
    }

    async delete(token: string, addressid: string){
        const [, jwt] = token.split(" ");
        const userid = verify(jwt, process.env.secretkey)
        const DeletedAddress = await this.addressModel.findOneAndDelete({user_id: userid.sub, _id: addressid})
        if (!DeletedAddress){
            throw new HttpException('Address not found', HttpStatus.NO_CONTENT);
        }
        return ({message: "Address deleted."})
    }

    async update(token: string, address: Address, addressid: string){
        const [, jwt] = token.split(" ")
        const userid = verify(jwt, process.env.secretkey)
        const updatedAddress = await this.addressModel.findOneAndUpdate({user_id: userid.sub, _id: addressid}, address)
        if (!updatedAddress){
            throw new HttpException('Address not found', HttpStatus.NO_CONTENT)
        }
        return ({message: "Address updated."})
    }

}
