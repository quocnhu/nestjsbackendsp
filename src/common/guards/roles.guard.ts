import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@/users/schemas/user.schema';
import { Route, RouteDocument } from '@/routes/schemas/route.schema';
import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';
/**
 * RoleGuard:
 * - Works together with JwtAuthGuard (so `req.user` already exists).
 * - Looks at the current request's route and method (GET, POST, etc).
 * - Finds what permission is required from the database.
 * - Compares with both user's own permissions AND their group's permissions.
 * - If matched → access granted, else → Forbidden.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Route.name) private routeModel: Model<RouteDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 👉 Skip guard if marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // --- Step 1: Extract request + authenticated user (from JWT) ---
    const request = context.switchToHttp().getRequest();
    const userFromJwt = request.user; // set by JwtAuthGuard
    if (!userFromJwt) {
      throw new ForbiddenException('Not authenticated');
    }

    // --- Step 2: Check what this route requires ---
    // Example: GET /users → needs "read_users" permission
    const routeDoc = await this.routeModel
      .findOne({
        path: request.route.path,   // e.g. "/users"
        method: request.method,     // e.g. "GET"
      })
      .populate('permission') // bring full permission document
      .lean();

    // If no permission is set in DB → route is public
    if (!routeDoc?.permission) {
      return true;
    }

    const requiredPermission = routeDoc.permission.name;

    // --- Step 3: Load fresh user from DB with relations ---
    const dbUser = await this.userModel
      .findById(userFromJwt._id)
      .populate('permissions') // user-specific permissions
      .populate({
        path: 'group',         // user’s group
        populate: { path: 'permissions' }, // group’s permissions
      })
      .lean();

    // --- Step 4: Collect all available permissions ---
    const userPerms = (dbUser?.permissions || []).map((p: any) => p.name);
    const groupPerms = (dbUser?.group?.permissions || []).map((p: any) => p.name);
    const allPerms = [...userPerms, ...groupPerms];

    // --- Step 5: Compare required vs user’s available ---
    if (allPerms.includes(requiredPermission)) {
      return true; // ✅ Access granted
    }

    // --- Step 6: Otherwise → block ---
    throw new ForbiddenException(`You need "${requiredPermission}" permission`);
  }
}
