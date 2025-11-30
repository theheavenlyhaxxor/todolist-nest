// added here some swagger-ui for endpoint documentation
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.enableCors({
    origin: ['http://localhost:3000', 'https://your-production-frontend.com'], // exact origins
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('Todo List API')
    .setDescription('The Todo List API descriptions')
    .setVersion('1.0')
    .addTag('todo')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT as string | number);
  console.log(`Server is Running on port ${process.env.PORT as string}`);
}
bootstrap();
