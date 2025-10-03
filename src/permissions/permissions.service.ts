import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from '@/permissions/schemas/permission.schema';
import { Model } from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel(Permission.name) private permModel: Model<PermissionDocument>) {}

  async create(data: Partial<Permission>) {
    return this.permModel.create(data);
  }

  async findAll() {
    return this.permModel.find().lean();
  }
}
