import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// @ts-ignore
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(7000);
  console.log('server was started on 7000 port')
}

bootstrap();