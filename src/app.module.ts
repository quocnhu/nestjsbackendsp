import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { RolesModule } from '@/roles/roles.module';
import { PermissionsModule } from '@/permissions/permission.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:p%40ssw0rdN@localhost:27017/'),
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule
  ],
})
export class AppModule {}
