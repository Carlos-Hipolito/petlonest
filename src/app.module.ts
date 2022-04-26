import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config()
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

const db_password = process.env.db_password;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://crud-cloud-teste:${db_password}@crud-cloud.usbvx.mongodb.net/petshop?retryWrites=true&w=majority`), 
    UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}/*implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(isAuthenticated)
    .forRoutes({path: 'user', method: RequestMethod.GET})
  }
}*/
