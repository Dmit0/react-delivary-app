import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// @ts-ignore
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
  console.log('server was started on 5000 port')
}

bootstrap();