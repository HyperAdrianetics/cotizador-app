# CLAUDE.md

Guía para trabajar en este repositorio. Generada el 2026-05-31.

## Qué es

Cotizador de **Hypernetics**: editor en vivo de cotizaciones + vista previa
tamaño carta + exportación a PDF, con un **catálogo reutilizable** y persistencia
de cotizaciones en backend. Uso interno, sin autenticación (por ahora).

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind 4.
- **Backend:** funciones serverless en `/api` (Node + TypeScript, estilo Vercel).
- **DB:** Postgres vía **Prisma 7** con adaptador seleccionable
  (`@prisma/adapter-neon` en prod, `@prisma/adapter-pg` en local).
- **Tipos compartidos:** `shared/` (esquemas **Zod** como fuente única; los tipos
  se derivan con `z.infer`).
- **Tests:** Vitest. Gestor de paquetes: **pnpm**.

## Estructura

```
src/                Frontend
  components/        DocumentPreview (documento/PDF — NO TOCAR diseño), Sidebar,
                     QuoteEditor, QuoteList, catalog/, ui/Modal
  hooks/useQuote.ts  Estado de la cotización: carga desde API, autosave (debounce
                     ~800ms), respaldo offline en localStorage
  api/               Cliente fetch tipado, debounce, quoteBackup
  types/quote.ts     Re-exporta tipos desde shared/ + defaultQuote
api/                 Funciones serverless (ruteo por archivos)
  _lib/              Lógica NO ruteada (prefijo _): prisma singleton, http (route/
                     ApiError/parseOr400), repositories (interfaces + memory + prisma),
                     services (catalog, quotes)
shared/              schemas.ts (Zod QuoteData), catalog.ts (entidades + inputs),
                     templates.ts (datos Hypernetics), index.ts
prisma/              schema.prisma, migrations/, seed.ts (idempotente)
prisma.config.ts     Config Prisma 7 (datasource url + seed); URL via env
generated/prisma/    Cliente Prisma generado (gitignored)
tests/               api/ (servicios+repos en memoria), frontend/ (cliente, hook)
dev-server.ts        Servidor API local que REUSA los handlers de api/ (para `pnpm dev:api`)
docker-compose.yml   Postgres local (puerto host 5434)
```

## Comandos

```bash
pnpm install            # instala + genera cliente Prisma (postinstall)
pnpm test               # Vitest (sin DB; usa repos en memoria)
pnpm exec tsc -b        # typecheck frontend
pnpm exec tsc --noEmit -p tsconfig.api.json   # typecheck backend (api/prisma/shared)
pnpm build              # prisma generate && tsc -b && vite build

# Desarrollo local (3 piezas):
docker compose up -d    # Postgres en localhost:5434
pnpm db:migrate         # aplica migraciones (requiere DATABASE_URL)
pnpm db:seed            # carga catálogo inicial (idempotente)
pnpm dev:api            # API local en :3001 (tsx watch dev-server.ts)
pnpm dev                # Vite (proxy /api -> :3001); ojo: si 5173 está ocupado usa 5174
```

## Variables de entorno (`.env`, ver `.env.example`)

- `DATABASE_URL` — cadena Postgres. Local (Docker) o Neon (prod).
- `DB_ADAPTER` — `pg` para local con Docker; sin definir (o `neon`) en producción.

## API

- Catálogo: `/api/catalog/items`, `/api/catalog/scope-blocks`,
  `/api/catalog/text-blocks` (filtro `?type=clause|addon|payment_condition|not_included`),
  cada uno con `/:id` para PATCH/DELETE.
- Cotizaciones: `/api/quotes` (GET lista resumen / POST) y `/api/quotes/:id`
  (GET completo / PUT autosave / DELETE).
- Errores uniformes `{ error }` con 400 (Zod) / 404 / 405 / 500.

## Convenciones y restricciones

- **NO tocar el diseño del documento/PDF:** `DocumentPreview.tsx`, `exportToPdf`
  en `QuoteEditor.tsx`, colores, layout carta, `numberToWords`, `dateUtils`.
- La cotización se guarda como **JSONB** (`quotes.data`) + columnas resumen
  desnormalizadas (folio, cliente, empresa, paquete, fecha) para el listado.
- El catálogo va en tablas estructuradas; `text_blocks` unifica 4 tipos por `type`
  (solo `addon` lleva `value`).
- `verbatimModuleSyntax` + `erasableSyntaxOnly` en el tsconfig del frontend:
  usar `import type` para tipos y **no** usar parámetros-propiedad en constructores
  dentro de `src/`.
- Arquitectura testeable: los **services** son lógica pura sobre **repositories**
  (interfaz); tests usan el repo en memoria, sin DB. Los entrypoints de `api/` son
  adaptadores delgados.

## Despliegue (Vercel + Neon, objetivo $0)

1. Crear base en Neon → `DATABASE_URL` (sin `DB_ADAPTER`).
2. Importar repo en Vercel, definir `DATABASE_URL`, build `pnpm build`.
3. `pnpm db:deploy` + `pnpm db:seed` contra Neon.

## OpenSpec

El cambio vive en `openspec/changes/cotizador-backend/` (proposal, design, specs,
tasks). Diseño previo de brainstorming en
`docs/superpowers/specs/2026-05-29-cotizador-backend-design.md`.
