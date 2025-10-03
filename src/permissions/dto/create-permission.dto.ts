import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  name: string; // e.g. "read_users"
}
