import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RolesService } from '@/roles/roles.service';
import { Role } from '@/roles/schemas/role.schema';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() body: { name: string; permissions?: string[] }): Promise<Role> {
    return this.rolesService.create(body.name, body.permissions || []);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findById(id);
  }
}
