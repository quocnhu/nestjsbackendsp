// groups/dto/create-group.dto.ts
import { IsString, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  permissions?: Types.ObjectId[]; // ✅ stays ObjectId
}
