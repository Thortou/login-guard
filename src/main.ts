import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IEnv } from './common/interfaces/env.interface';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService<IEnv>)
  app.setGlobalPrefix('api')
  
  await app.listen(config.get('SERVER_PORT'));
}
bootstrap();
