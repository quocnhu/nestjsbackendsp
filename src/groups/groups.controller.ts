import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './schemas/group.schema';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() body: { name: string; users?: string[]; roles?: string[] }): Promise<Group> {
    return this.groupsService.create(body.name, body.users || [], body.roles || []);
  }

  @Get()
  findAll(): Promise<Group[]> {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Group> {
    return this.groupsService.findById(id);
  }
}
