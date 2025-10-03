// routes/dto/create-route.dto.ts
import { IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRouteDto {
  @IsString()
  path: string;

  @IsString()
  method: string;

  @IsOptional()
  permission?: Types.ObjectId; // ✅ stays ObjectId
}
