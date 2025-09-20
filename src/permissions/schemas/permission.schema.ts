import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true })
export class Permission {
  @Prop({ required: true })
  resource: string; // e.g., "user", "role", "group"

  @Prop({ required: true })
  action: string; // e.g., "create", "read", "update", "delete"

  @Prop({ required: true, unique: true })
  name: string; // e.g., "user.create"
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
