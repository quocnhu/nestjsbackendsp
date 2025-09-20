import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PermissionGuard } from '@/common/guards/permission.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error if extra props
      transform: true,            // Auto-transform payloads to DTO instances
    }),
  );

  // Register global guard (role + public check)
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new PermissionGuard(reflector));

  await app.listen(3000);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Reflector } from '@nestjs/core';
// import { JwtAuthGuard } from './auth/strategies/jwt-auth.guard';
// import { PermissionGuard } from './common/guards/permission.guard';
// import cookieParser from 'cookie-parser';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   //CookiParser
//   app.use(cookieParser());
//   // Global guards
//   const reflector = app.get(Reflector);

//   // Apply global guards: JWT first, then PermissionGuard
//   app.useGlobalGuards(
//     new JwtAuthGuard(reflector),
//     new PermissionGuard(reflector),
//   );
//   // CORS configuration
//   app.enableCors({
//     origin: ['http://localhost:4000'], // allowed origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],                   // allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'],            // allowed headers
//     exposedHeaders: ['Authorization'],                            // headers exposed to frontend
//     credentials: true,                                            // allow cookies
//     maxAge: 3600,                                                 // cache preflight response (in seconds)
//   });
//   // Set global prefix
//   app.setGlobalPrefix('api'); // 👈 all routes will be prefixed with /api
//   await app.listen(5000);
//   console.log('Server running on http://localhost:5000/api');
// }
// bootstrap();
