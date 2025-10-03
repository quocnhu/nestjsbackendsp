import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Permission } from '@/permissions/schemas/permission.schema';

@Schema({ timestamps: true })
export class Route {
  @Prop({ required: true })
  path: string; // e.g. "/users"

  @Prop({ required: true })
  method: string; // e.g. "GET", "POST"

  @Prop({ type: Types.ObjectId, ref: Permission.name })
  permission: Permission;
}

export type RouteDocument = Route & Document;
export const RouteSchema = SchemaFactory.createForClass(Route);
