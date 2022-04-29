import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressSchema } from 'src/schemas/AddressSchema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema}])],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
