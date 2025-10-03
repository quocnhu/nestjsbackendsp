import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RoleGuard } from '@/common/guards/roles.guard';
import { PermissionsModule } from '@/permissions/permissions.module';
import { GroupsModule } from '@/groups/groups.module';
import { RoutesModule } from '@/routes/routes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:p%40ssw0rdN@localhost:27017/'),
    AuthModule,
    UsersModule,
    PermissionsModule,
    GroupsModule,
    RoutesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // 👈 applies globally
    },
    {
    provide: APP_GUARD,
    useClass: RoleGuard, // then check authorization
  },
  ],
})
export class AppModule {}
