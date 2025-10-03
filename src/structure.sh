#!/bin/bash

# Use current directory as base
BASE_DIR="."

# Define modules and schema file names
declare -A MODULES
MODULES=( 
  ["groups"]="group.schema.ts"
  ["permissions"]="permission.schema.ts"
  ["routes"]="route.schema.ts"
)

for module in "${!MODULES[@]}"; do
  echo "📂 Creating module: $module"
  mkdir -p $BASE_DIR/$module/schemas

  # Create core files
  touch $BASE_DIR/$module/${module}.module.ts
  touch $BASE_DIR/$module/${module}.service.ts
  touch $BASE_DIR/$module/${module}.controller.ts

  # Create schema file
  touch $BASE_DIR/$module/schemas/${MODULES[$module]}
done

echo "✅ RBAC module structure created in $(pwd)!"

