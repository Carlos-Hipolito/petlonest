import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PetSchema } from 'src/schemas/PetSchema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pet', schema: PetSchema}])],
  controllers: [PetController],
  providers: [PetService]
})
export class PetModule {}
