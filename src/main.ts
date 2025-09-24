import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Server is Running on port ${process.env.PORT || 3000}`);
  } catch (error) {
    throw new Error(`Failed to start server ${error.message}`);
  }
}
bootstrap();
