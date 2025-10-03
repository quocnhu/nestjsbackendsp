import { NestFactory} from '@nestjs/core';
import { AppModule } from '@/app.module';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS configuration
  app.enableCors({
    origin: ['http://localhost:4000'], // allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],                   // allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],            // allowed headers
    exposedHeaders: ['Authorization'],                            // headers exposed to frontend
    credentials: true,                                            // allow cookies
    maxAge: 3600,                                                 // cache preflight response (in seconds)
  });
   app.use(cookieParser()); // ✅ must be added
  //Set global prefix
   app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();

