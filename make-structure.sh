#!/bin/bash
cd src

mkdir -p common/decorators common/guards
mkdir -p auth/dto
mkdir -p users/dto users/schemas

touch app.module.ts main.ts
touch common/decorators/get-user.decorator.ts
touch common/decorators/roles.decorator.ts
touch common/guards/jwt-auth.guard.ts
touch common/guards/roles.guard.ts
touch auth/auth.module.ts
touch auth/auth.controller.ts
touch auth/auth.service.ts
touch auth/jwt.strategy.ts
touch auth/dto/login.dto.ts
touch auth/dto/register.dto.ts
touch users/users.module.ts
touch users/users.controller.ts
touch users/users.service.ts
touch users/schemas/user.schema.ts
touch users/dto/create-user.dto.ts
touch users/dto/update-user.dto.ts
