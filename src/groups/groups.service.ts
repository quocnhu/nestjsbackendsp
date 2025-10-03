import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from '@/groups/schemas/group.schema';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  // groups.service.ts
async create(data: CreateGroupDto) {
  return this.groupModel.create({
    name: data.name,
    permissions: data.permissions, // ObjectId[] works since schema expects ref
  });
}


  async findAll() {
    return this.groupModel.find().populate('permissions').lean();
  }

  async findById(id: string) {
    return this.groupModel.findById(id).populate('permissions').lean();
  }
}
