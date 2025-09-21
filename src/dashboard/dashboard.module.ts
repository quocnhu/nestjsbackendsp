import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardService } from '@/dashboard/dashboard.service';
import { DashboardController } from '@/dashboard/dashboard.controller';
import { User, UserSchema } from '@/users/schemas/user.schema';
import { Role, RoleSchema } from '@/roles/schemas/role.schema';
import { Group, GroupSchema } from '@/groups/schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
