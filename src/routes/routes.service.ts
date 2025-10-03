import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Route, RouteDocument } from '@/routes/schemas/route.schema';
import { Model } from 'mongoose';
import { CreateRouteDto } from './dto/create-route.dto';

@Injectable()
export class RoutesService {
  constructor(@InjectModel(Route.name) private routeModel: Model<RouteDocument>) { }

  // routes.service.ts
  async create(data: CreateRouteDto) {
    return this.routeModel.create({
      path: data.path,
      method: data.method,
      permission: data.permission, // ObjectId works since schema expects ref
    });
  }


  async findAll() {
    return this.routeModel.find().populate('permission').lean();
  }
}
