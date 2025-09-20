import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RouteDocument = Route & Document;

@Schema({ timestamps: true })
export class Route {
  @Prop({ required: true })
  path: string; // e.g., "/users"

  @Prop({ required: true })
  method: string; // e.g., "GET", "POST"

  @Prop({ required: true, unique: true })
  name: string; // e.g., "users.getAll"

  @Prop({ default: '' })
  description: string;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
