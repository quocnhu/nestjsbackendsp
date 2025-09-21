import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from '@/groups/schemas/group.schema';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>) {}

  async create(name: string, users: string[] = [], roles: string[] = []): Promise<Group> {
    const group = new this.groupModel({ name, users, roles });
    return group.save();
  }

  async findAll(): Promise<Group[]> {
    return this.groupModel.find().populate('users').populate('roles').exec();
  }

  async findById(id: string): Promise<Group> {
    const group = await this.groupModel.findById(id).populate('users').populate('roles').exec();
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }
}
