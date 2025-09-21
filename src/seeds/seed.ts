import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { UsersService } from '@/users/users.service';
import { RolesService } from '@/roles/roles.service';
import { PermissionsService } from '@/permissions/permissions.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const rolesService = app.get(RolesService);
  const permissionsService = app.get(PermissionsService);

  // Seed permissions
  const permissions = [
    { resource: 'user', action: 'create' },
    { resource: 'user', action: 'read' },
    { resource: 'user', action: 'update' },
    { resource: 'user', action: 'delete' },
  ];
  for (const p of permissions) {
    await permissionsService.create(p.resource, p.action);
  }

  // Seed role
  const adminRole = await rolesService.create('Admin', permissions.map(p => `${p.resource}.${p.action}`));

  // Seed user
  await usersService.create({
    username: 'admin',
    email: 'admin@example.com',
    password: 'p@ssw0rdN', // will be hashed
    roles: [adminRole._id],
  });

  console.log('✅ Seeding completed!');
  await app.close();
}

bootstrap();


// Why?

// Your RolesService.create() probably returns a Role (class/interface), not a RoleDocument.

// Only Mongoose Documents (RoleDocument) have _id.