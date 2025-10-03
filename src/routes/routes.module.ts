import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Route, RouteSchema } from '@/routes/schemas/route.schema';
import { Permission, PermissionSchema } from '@/permissions/schemas/permission.schema';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Route.name, schema: RouteSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [RoutesService],
  controllers: [RoutesController],
  exports: [RoutesService,MongooseModule], // mind on it> MongooseModule
})
export class RoutesModule {}
