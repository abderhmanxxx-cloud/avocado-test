{
  "name": "avocado-cosmetics",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate deploy",
    "db:seed": "ts-node prisma/seed.ts"
  },
  "dependencies": {
    "@prisma/client": "^5.10.0",
    "axios": "^1.6.7",
    "bcryptjs": "^2.4.3",
    "crypto-js": "^4.2.0",
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "sanitize-html": "^2.13.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.5",
    "@types/react": "^18.2.48",
    "prisma": "^5.10.0",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
}
