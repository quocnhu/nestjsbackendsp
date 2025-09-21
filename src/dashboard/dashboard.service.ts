import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@/users/schemas/user.schema';
import { Role, RoleDocument } from '@/roles/schemas/role.schema';
import { Group, GroupDocument } from '@/groups/schemas/group.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async getStats() {
    const userCount = await this.userModel.countDocuments();
    const roleCount = await this.roleModel.countDocuments();
    const groupCount = await this.groupModel.countDocuments();

    return {
      users: userCount,
      roles: roleCount,
      groups: groupCount,
    };
  }
}
