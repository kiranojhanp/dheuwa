import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );

  await app.register(helmet);
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
