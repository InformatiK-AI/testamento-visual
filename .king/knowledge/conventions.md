---
project: "Cómics Bíblicos Digitales"
generated-by: /genesis
genesis-version: 2.0
date: 2026-06-11
author: Host
---

# Convenciones de Código

Stack: React + TypeScript + Express.js

---

## Naming Conventions

### Frontend (React)

| Qué | Patrón | Ejemplo |
|-----|--------|---------|
| Componentes | PascalCase | `ComicReader.tsx`, `SubscriptionCard.tsx` |
| Hooks | camelCase, prefijo `use` | `useComics()`, `useSubscription()` |
| Variables | camelCase | `const comicList = [...]` |
| Constants | UPPER_SNAKE_CASE | `const MAX_PAGE_SIZE = 10` |
| Tipos | PascalCase | `type Comic = {...}`, `interface User {...}` |
| Archivos | kebab-case o PascalCase | `comic-reader.tsx` o `ComicReader.tsx` |
| Carpetas | kebab-case | `src/components/comic-viewer/` |
| CSS Classes | kebab-case (BEM) | `.comic-card`, `.comic-card__title` |

### Backend (Node.js)

| Qué | Patrón | Ejemplo |
|-----|--------|---------|
| Controllers | PascalCase | `ComicController.ts` |
| Services | PascalCase | `StripeService.ts` |
| Routes | camelCase | `/api/comics`, `/api/auth/login` |
| Middleware | camelCase | `authMiddleware`, `validatePayload` |
| Funciones | camelCase | `getUserById()`, `createSubscription()` |
| Variables | camelCase | `const userEmail = req.body.email` |
| Constants | UPPER_SNAKE_CASE | `const JWT_EXPIRY = 3600` |

### Database (PostgreSQL)

| Qué | Patrón | Ejemplo |
|-----|--------|---------|
| Tablas | snake_case, plural | `users`, `subscriptions`, `comics` |
| Columnas | snake_case | `created_at`, `user_id`, `subscription_status` |
| Índices | idx_{table}_{column} | `idx_users_email`, `idx_subscriptions_user_id` |
| Enums | UPPER_SNAKE_CASE | `'ACTIVE'`, `'EXPIRED'`, `'CANCELLED'` |

---

## Estructura de Archivos

### Frontend

```
src/
├── components/
│   ├── comic-reader/          # Feature: lector de cómics
│   │   ├── ComicReader.tsx    # Componente principal
│   │   ├── ComicReader.module.css
│   │   ├── useComicNavigation.ts  # Custom hook
│   │   └── types.ts           # Types específicos
│   ├── subscription-card/     # Feature: card de suscripción
│   │   ├── SubscriptionCard.tsx
│   │   └── SubscriptionCard.module.css
│   └── shared/                # Componentes reutilizables
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── Navigation.tsx
├── pages/
│   ├── Home.tsx               # Landing / listado de cómics
│   ├── ComicDetail.tsx        # Detalle + lector
│   ├── Subscription.tsx       # Checkout
│   ├── Login.tsx              # OAuth con Firebase
│   └── Dashboard.tsx          # Perfil de usuario
├── hooks/
│   ├── useAuth.ts             # Autenticación
│   ├── useComics.ts           # Fetch de cómics
│   └── useSubscription.ts     # Estado de suscripción
├── services/
│   ├── api.ts                 # Configuración de Axios
│   ├── comicsAPI.ts           # Llamadas a /api/comics
│   └── authAPI.ts             # Llamadas a /api/auth
├── store/
│   ├── authStore.ts           # Zustand store de auth
│   └── comicsStore.ts         # Zustand store de cómics
├── types/
│   └── index.ts               # Tipos globales
├── utils/
│   ├── formatCLP.ts           # Formatear moneda
│   └── dateFormatter.ts
└── App.tsx
```

### Backend

```
src/
├── routes/
│   ├── comics.routes.ts       # GET /api/comics
│   ├── auth.routes.ts         # POST /api/auth/login
│   ├── subscriptions.routes.ts # POST /api/subscriptions
│   └── webhooks.routes.ts     # POST /api/webhooks (Stripe)
├── controllers/
│   ├── ComicController.ts
│   ├── AuthController.ts
│   └── SubscriptionController.ts
├── services/
│   ├── StripeService.ts       # Integración con Stripe
│   ├── ComicService.ts        # Lógica de negocio
│   ├── SubscriptionService.ts
│   └── AuthService.ts
├── middleware/
│   ├── auth.middleware.ts     # Validar JWT
│   ├── validate.middleware.ts # Zod validation
│   └── errorHandler.middleware.ts
├── models/
│   ├── User.ts                # Prisma models (o tipos)
│   └── Comic.ts
├── config/
│   ├── database.ts            # Prisma client
│   ├── env.ts                 # Variables de entorno
│   └── stripe.ts              # Configuración Stripe
├── types/
│   └── index.ts               # Tipos compartidos
├── utils/
│   ├── logger.ts              # Winston o Pino
│   └── errorHandler.ts
├── prisma/
│   └── schema.prisma          # Definición de DB
└── server.ts                  # Entrada principal
```

---

## Patrones de Código

### React Component

```typescript
// ComicReader.tsx
import React, { useState } from 'react';
import styles from './ComicReader.module.css';
import { Comic } from '@/types';

interface ComicReaderProps {
  comic: Comic;
  onClose: () => void;
}

export const ComicReader: React.FC<ComicReaderProps> = ({ comic, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, comic.pages.length - 1));
  };

  return (
    <div className={styles.reader}>
      <button onClick={onClose}>Cerrar</button>
      <img src={comic.pages[currentPage]} alt={`Página ${currentPage}`} />
      <button onClick={handleNextPage}>Siguiente</button>
    </div>
  );
};
```

### Express Controller

```typescript
// ComicController.ts
import { Request, Response } from 'express';
import { ComicService } from '@/services';

export class ComicController {
  static async getAll(req: Request, res: Response) {
    try {
      const comics = await ComicService.listAll();
      res.json(comics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comics' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const comic = await ComicService.findById(id);
      res.json(comic);
    } catch (error) {
      res.status(404).json({ error: 'Comic not found' });
    }
  }
}
```

---

## Linting & Formatting

### ESLint (.eslintrc.json)

```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": { "ecmaVersion": 2022 },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-function-return-types": "warn"
  }
}
```

### Prettier (.prettierrc)

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

### Comandos

```bash
npm run lint        # ESLint
npm run format      # Prettier (write)
npm run format:check # Prettier (check only)
```

---

## Testing

### Frontend (Jest + React Testing Library)

```typescript
// ComicReader.test.tsx
import { render, screen } from '@testing-library/react';
import { ComicReader } from './ComicReader';

describe('ComicReader', () => {
  it('renders comic title', () => {
    const comic = { id: '1', title: 'Génesis', pages: [] };
    render(<ComicReader comic={comic} onClose={() => {}} />);
    expect(screen.getByText('Génesis')).toBeInTheDocument();
  });
});
```

### Backend (Jest)

```typescript
// ComicService.test.ts
import { ComicService } from './ComicService';

describe('ComicService', () => {
  it('should fetch comics', async () => {
    const comics = await ComicService.listAll();
    expect(comics).toHaveLength(0);
  });
});
```

---

## Commits

### Conventional Commits

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Tipos**: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`

**Ejemplos**:
- `feat(reader): add page navigation`
- `fix(auth): validate JWT expiry correctly`
- `refactor(components): extract Button to shared`
- `test(comics): add unit tests for ComicService`

