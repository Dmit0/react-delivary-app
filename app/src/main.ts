import { NestFactory } from '@nestjs/core';
import { ENV_VAR } from '../config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(ENV_VAR.appPort);
  console.log(`server was started on ${ENV_VAR.appPort} port`)
}

bootstrap();