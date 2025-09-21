import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutesService } from '@/routes/routes.service';
import { RoutesController } from '@/routes/routes.controller';
import { Route, RouteSchema } from '@/routes/schemas/route.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Route.name, schema: RouteSchema }])],
  providers: [RoutesService],
  controllers: [RoutesController],
  exports: [RoutesService],
})
export class RoutesModule {}
