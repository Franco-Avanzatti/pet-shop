import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log('🚀 [main.ts] bootstrap start');

  console.log('🚀 [main.ts] NODE_ENV:', process.env.NODE_ENV);
  console.log('🚀 [main.ts] PORT:', process.env.PORT);
  console.log('🚀 [main.ts] DATABASE_URL:', process.env.DATABASE_URL);

  const app = await NestFactory.create(AppModule);

  console.log('🚀 [main.ts] Nest app created');

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  console.log('🚀 [main.ts] Listening on port:', port);

  await app.listen(port);
}

bootstrap().catch((err) => {
  console.error('❌ [main.ts] bootstrap error:', err);
  process.exit(1);
});
