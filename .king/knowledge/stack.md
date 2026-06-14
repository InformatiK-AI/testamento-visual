---
project: "Cómics Bíblicos Digitales"
generated-by: /genesis
genesis-version: 2.0
date: 2026-06-11
author: Host
---

# Stack Tecnológico

**Tipo de producto**: Web App (SPA) con Backend API

---

## Frontend

| Componente | Tecnología | Propósito |
|------------|-----------|----------|
| Framework | React 18+ | UI interactiva |
| Lenguaje | TypeScript | Type safety |
| Bundler | Vite o Next.js | Build rápido |
| Styling | Tailwind CSS | Utilidad-first CSS |
| State Management | Zustand o TanStack Query | Cliente global |
| UI Components | Radix UI o shadcn/ui | Accesibilidad incluida |
| Forms | React Hook Form | Validación ligera |
| Testing | Vitest + Testing Library | Unit + integration tests |
| E2E Testing | Playwright o Cypress | Testing de flujos |

---

## Backend

| Componente | Tecnología | Propósito |
|------------|-----------|----------|
| Runtime | Node.js 18+ | JavaScript en servidor |
| Framework | Express.js o FastAPI | Minimalista/rápido |
| Lenguaje | JavaScript/TypeScript | Coherencia con frontend |
| ORM | Prisma (Node) o SQLAlchemy (Python) | Database abstraction |
| Auth | Firebase Auth o Auth0 | Autenticación OAuth |
| Payments | Stripe SDK o MercadoPago SDK | Procesar pagos |
| Validation | Zod o Joi | Input validation |
| Testing | Jest o Pytest | Unit + API tests |
| Logging | Pino o Winston | Structured logging |

---

## Base de Datos

| Componente | Tecnología | Propósito |
|------------|-----------|----------|
| DBMS | PostgreSQL 14+ | Relacional robusto |
| Migrations | Prisma Migrate o Alembic | Versionado de schema |
| Connection Pool | Prisma Client o psycopg2 | Gestión eficiente |
| Caching | Redis (opcional) | Sesiones + caché |

---

## DevOps & Hosting

| Componente | Tecnología | Propósito |
|------------|-----------|----------|
| Frontend Deploy | Vercel o Netlify | Auto-deploy desde git |
| Backend Deploy | Railway, Render, o Fly.io | Fácil escalado |
| Database Hosting | Vercel Postgres, Render, o AWS RDS | Managed PostgreSQL |
| Environment | .env files + 12-factor app | Secretos por ambiente |
| CI/CD | GitHub Actions | Build + test automático |
| Monitoring | Sentry (optional) | Error tracking |

---

## Dependencias Clave

### Frontend (package.json)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.0.0",
    "zustand": "^4.0.0",
    "axios": "^1.0.0",
    "tailwindcss": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^4.0.0",
    "vitest": "^0.34.0",
    "@testing-library/react": "^14.0.0"
  }
}
```

### Backend (package.json)

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "prisma": "^5.0.0",
    "@prisma/client": "^5.0.0",
    "stripe": "^13.0.0",
    "firebase-admin": "^11.0.0",
    "zod": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "jest": "^29.0.0",
    "ts-jest": "^29.0.0"
  }
}
```

---

## Prioridades de Stack

1. **UX** → React + Tailwind + Radix UI (componentes accesibles)
2. **Performance** → Vite + code splitting + image optimization
3. **Velocidad de desarrollo** → TypeScript + Prisma + Stripe SDK (reducir boilerplate)

---

## Notas de Implementación

- **Auth**: Firebase Auth recomendado (login con Google incluido, no requiere backend custom)
- **Pagos**: Stripe recomendado (mejor documentación + MercadoPago como alternativa)
- **Database**: PostgreSQL en Vercel Postgres (managed, sin ops)
- **Monolito modular**: Backend en carpeta separada (`/src/backend`) de frontend (`/src/frontend`)

