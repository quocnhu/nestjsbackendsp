import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../../roles/schemas/role.schema';
import { User } from '../../users/schemas/user.schema';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
export class Group {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
