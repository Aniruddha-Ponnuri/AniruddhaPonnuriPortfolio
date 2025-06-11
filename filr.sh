#!/bin/bash

# Create directories
mkdir -p src/app/api/github
mkdir -p src/app/api/readme
mkdir -p src/app/components/ui
mkdir -p src/app/components/layout
mkdir -p src/app/components/project
mkdir -p src/app/components/search
mkdir -p src/app/lib
mkdir -p src/app/types
mkdir -p public

# Create files
touch src/app/api/github/route.ts
touch src/app/api/readme/route.ts
touch src/app/components/ui/.gitkeep
touch src/app/components/layout/.gitkeep
touch src/app/components/project/.gitkeep
touch src/app/components/search/.gitkeep
touch src/app/lib/github.ts
touch src/app/lib/groq.ts
touch src/app/lib/utils.ts
touch src/app/types/index.ts
touch src/app/globals.css
touch src/app/layout.tsx
touch src/app/page.tsx
touch .env.local

echo "File structure created successfully."
