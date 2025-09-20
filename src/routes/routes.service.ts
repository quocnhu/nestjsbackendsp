import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route, RouteDocument } from './schemas/route.schema';

@Injectable()
export class RoutesService {
  constructor(@InjectModel(Route.name) private routeModel: Model<RouteDocument>) {}

  async create(path: string, method: string, description = ''): Promise<Route> {
    const name = `${path}.${method.toLowerCase()}`;
    const route = new this.routeModel({ path, method, name, description });
    return route.save();
  }

  async findAll(): Promise<Route[]> {
    return this.routeModel.find().exec();
  }

  async findById(id: string): Promise<Route> {
    const route = await this.routeModel.findById(id).exec();
    if (!route) throw new NotFoundException('Route not found');
    return route;
  }
}
