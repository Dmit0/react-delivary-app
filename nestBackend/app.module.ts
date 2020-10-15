import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://sheshunov00:h387rqy834grif@cluster0.qb2dz.azure.mongodb.net/react-delivary-app?retryWrites=true&w=majority'),
  ],
})
export class AppModule {
}