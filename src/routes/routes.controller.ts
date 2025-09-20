import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Route } from './schemas/route.schema';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(@Body() body: { path: string; method: string; description?: string }): Promise<Route> {
    return this.routesService.create(body.path, body.method, body.description || '');
  }

  @Get()
  findAll(): Promise<Route[]> {
    return this.routesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Route> {
    return this.routesService.findById(id);
  }
}
