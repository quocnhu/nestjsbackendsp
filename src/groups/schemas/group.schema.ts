import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Permission } from '@/permissions/schemas/permission.schema';

@Schema({ timestamps: true })
export class Group {
  @Prop({ required: true, unique: true })
  name: string; // e.g. "admin", "user"

  @Prop({ type: [{ type: Types.ObjectId, ref: Permission.name }] })
  permissions: Permission[];
}

export type GroupDocument = Group & Document;
export const GroupSchema = SchemaFactory.createForClass(Group);
