import { connect, model } from 'mongoose';
import { Permission, PermissionSchema } from '@/permissions/schemas/permission.schema';
import { Group, GroupSchema } from '@/groups/schemas/group.schema';
import { User, UserSchema } from '@/users/schemas/user.schema';
import { Route, RouteSchema } from '@/routes/schemas/route.schema';
import * as bcrypt from 'bcryptjs';

const MONGO_URI = 'mongodb://root:p%40ssw0rdN@localhost:27017';

async function seed() {
  await connect(MONGO_URI);
  console.log('Connected to MongoDB ✅');

  // ✅ Compile models manually
  const PermissionModel = model(Permission.name, PermissionSchema);
  const GroupModel = model(Group.name, GroupSchema);
  const UserModel = model(User.name, UserSchema);
  const RouteModel = model(Route.name, RouteSchema);

  // --- 1. Permissions ---
  const basePermissions = [
    { name: 'read_users' },
    { name: 'create_users' },
    { name: 'update_users' },
    { name: 'delete_users' },
    { name: 'read_groups' },
    { name: 'create_groups' },
  ];
  await PermissionModel.deleteMany({});
  const permissionDocs = await PermissionModel.insertMany(basePermissions);
  console.log('✅ Permissions:', permissionDocs.map((p) => p.name));

  // --- 2. Groups ---
  await GroupModel.deleteMany({});
  const adminGroup = await GroupModel.create({
    name: 'admin',
    permissions: permissionDocs.map((p) => p._id),
  });

  const userGroup = await GroupModel.create({
    name: 'user',
    permissions: permissionDocs
      .filter((p) => p.name.startsWith('read_'))
      .map((p) => p._id),
  });

  console.log('✅ Groups:', [adminGroup.name, userGroup.name]);

  // --- 3. Routes ---
  await RouteModel.deleteMany({});
  const routes = [
    { path: '/users', method: 'GET', permission: permissionDocs.find((p) => p.name === 'read_users')._id },
    { path: '/users', method: 'POST', permission: permissionDocs.find((p) => p.name === 'create_users')._id },
    { path: '/groups', method: 'GET', permission: permissionDocs.find((p) => p.name === 'read_groups')._id },
  ];
  const routeDocs = await RouteModel.insertMany(routes);
  console.log('✅ Routes:', routeDocs.map((r) => `${r.method} ${r.path}`));

  // --- 4. Users ---
  await UserModel.deleteMany({});
  const passwordHash = await bcrypt.hash('p@ssw0rdN', 10);

  const adminUser = await UserModel.create({
    username: 'admin',
    email: 'admin@example.com',
    password: passwordHash,
    group: adminGroup._id,
    permissions: [],
  });

  const normalUser = await UserModel.create({
    username: 'john',
    email: 'john@example.com',
    password: await bcrypt.hash('user123', 10),
    group: userGroup._id,
    permissions: [],
  });

  console.log('✅ Users:', [adminUser.username, normalUser.username]);

  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
