import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Usamos process.env (no el helper env()) para que `prisma generate` no falle
    // si DATABASE_URL no está definida (p. ej. durante el build en Vercel).
    // migrate y el runtime sí requieren que esté configurada.
    url: process.env.DATABASE_URL ?? '',
  },
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
});
