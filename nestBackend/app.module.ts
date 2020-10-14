import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sheshunov00:h387rqy834grif@cluster0.qb2dz.azure.mongodb.net/react-delivary-app?retryWrites=true&w=majority'),
  ],
})
export class AppModule {
}