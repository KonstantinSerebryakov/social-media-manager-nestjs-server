import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const validationPipeOptions = {
    skipMissingProperties: false,
    whitelist: true,
    forbidNonWhitelisted: true,
  };

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.enableCors();
  await app.listen(PORT);
  console.log(`The application is running on ${PORT} port!`);
}

bootstrap().catch((e) => {
  console.error(e);
});
