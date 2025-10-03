import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Group } from '@/groups/schemas/group.schema';         // ✅ import Group
import { Permission } from '@/permissions/schemas/permission.schema'; // ✅ import Permission

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: Group.name })
  group: Group;

  @Prop({ type: [{ type: Types.ObjectId, ref: Permission.name }] })
  permissions: Permission[];
}

export const UserSchema = SchemaFactory.createForClass(User);
