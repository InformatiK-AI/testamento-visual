---
project: "Cómics Bíblicos Digitales"
generated-by: /genesis
genesis-version: 2.0
date: 2026-06-11
author: Host
---

# Ambientes de Ejecución

> ⚠️ **Base Template** — valores placeholder inferidos por `/genesis`.  
> URLs, puertos y variables de entorno reales: completar en `/brainstorm`.

---

## Tabla Resumen

| Ambiente | Frontend URL | Backend URL | Database |
|----------|--------------|------------|----------|
| **Development** | http://localhost:3000 | http://localhost:4000 | postgres://localhost:5432/comics_dev |
| **QA/Staging** | https://qa.comics.example.com | https://api-qa.comics.example.com | postgres://qa-db:5432/comics_qa |
| **Production** | https://comics.example.com | https://api.comics.example.com | postgres://prod-db:5432/comics_prod |

---

## Development (Local)

### URLs

```
Frontend:  http://localhost:3000
Backend:   http://localhost:4000
Database:  localhost:5432/comics_dev
```

### Variables de Entorno (.env.local)

```bash
# Frontend (.env.local)
REACT_APP_API_URL=http://localhost:4000
REACT_APP_FIREBASE_CONFIG_KEY=YOUR_DEV_FIREBASE_KEY

# Backend (.env.local)
DATABASE_URL=postgresql://user:password@localhost:5432/comics_dev
JWT_SECRET=dev-secret-key-change-in-prod
STRIPE_SECRET_KEY=sk_test_... (Stripe test mode)
STRIPE_PUBLISHABLE_KEY=pk_test_...
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
NODE_ENV=development
LOG_LEVEL=debug
```

### Health Check (Development)

```bash
# Frontend
curl http://localhost:3000

# Backend
curl http://localhost:4000/health

# Database
psql -U postgres -d comics_dev -c "SELECT 1;"
```

### Iniciar Desarrollo

```bash
# Terminal 1: Frontend
npm run dev:frontend

# Terminal 2: Backend
npm run dev:backend

# Terminal 3: Database (si usas local PostgreSQL)
# Asegúrate de que PostgreSQL esté corriendo
sudo service postgresql start
```

---

## QA/Staging

### URLs

```
Frontend:  https://qa.comics.example.com
Backend:   https://api-qa.comics.example.com
Database:  Vercel Postgres o AWS RDS (staging)
```

### Variables de Entorno

```bash
# Similares a dev, pero con URLs de staging
DATABASE_URL=postgresql://user:password@qa-db.example.com:5432/comics_qa
STRIPE_SECRET_KEY=sk_test_... (Stripe test mode, pero con webhook sandbox)
JWT_SECRET=qa-secret-key-more-secure
NODE_ENV=staging
LOG_LEVEL=info
```

### Deployment (QA)

```bash
# Trigger automático desde rama `develop`
git push origin develop
# CI/CD (GitHub Actions) automáticamente:
#   1. Corre tests
#   2. Builds frontend + backend
#   3. Deploy a Vercel (frontend) + Railway (backend)
```

---

## Production

### URLs

```
Frontend:  https://comics.example.com (o tu dominio)
Backend:   https://api.comics.example.com
Database:  Vercel Postgres o AWS RDS (production)
```

### Variables de Entorno (SECRETAS)

```bash
# NUNCA commitear estos valores
DATABASE_URL=postgresql://user:password@prod-db.example.com:5432/comics_prod
STRIPE_SECRET_KEY=sk_live_... (Stripe LIVE mode)
STRIPE_PUBLISHABLE_KEY=pk_live_...
JWT_SECRET=<generate-secure-random-key>
FIREBASE_SERVICE_ACCOUNT=<service-account-prod>
NODE_ENV=production
LOG_LEVEL=warn
SENTRY_DSN=https://... (error tracking)
ENABLE_ANALYTICS=true
```

### Deployment (Production)

```bash
# Merge a main + tag como versión
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags
# CI/CD automáticamente:
#   1. Corre full test suite
#   2. Builds + deploys a Vercel + Railway con prod secrets
#   3. Migra database schema si aplica
#   4. Warming up de caches
```

### Health Check (Production)

```bash
# Frontend
curl https://comics.example.com --silent | grep "<title>"

# Backend
curl https://api.comics.example.com/health

# Database
# (No exponer con curl, pero monitorear con Sentry/datadog)
```

---

## Secretos por Ambiente

### Development

- **Firebase**: Usa proyecto DEV de Firebase Console
- **Stripe**: Test API keys (sk_test_...)
- **Database**: Local PostgreSQL o Vercel Postgres dev

### Production

- **Firebase**: Usa proyecto PROD de Firebase Console
- **Stripe**: LIVE API keys (sk_live_...)
- **Database**: Vercel Postgres prod con backups automáticos
- **Sentry**: PROD organization para error tracking

### Rotación de Secretos

```bash
# Cada 90 días (best practice)
1. Generar nuevo JWT_SECRET
2. Actualizar STRIPE_SECRET_KEY en Stripe Dashboard
3. Rotar DATABASE_URL (cambiar contraseña en DB)
4. Notificar a @security si hay breach
```

---

## Configuración por Ambiente

### Frontend (.env files)

```
# .env.development
REACT_APP_API_URL=http://localhost:4000
REACT_APP_ENV=development
REACT_APP_LOG_LEVEL=debug

# .env.staging
REACT_APP_API_URL=https://api-qa.comics.example.com
REACT_APP_ENV=staging
REACT_APP_LOG_LEVEL=info

# .env.production
REACT_APP_API_URL=https://api.comics.example.com
REACT_APP_ENV=production
REACT_APP_LOG_LEVEL=warn
```

### Backend (.env files)

```
# .env.development
NODE_ENV=development
PORT=4000
LOG_LEVEL=debug

# .env.staging
NODE_ENV=staging
PORT=4000
LOG_LEVEL=info

# .env.production
NODE_ENV=production
PORT=4000
LOG_LEVEL=warn
```

---

## Migraciones de Base de Datos

### Development

```bash
# Ejecutar migraciones locales
npm run db:migrate

# Generar nueva migración
npx prisma migrate dev --name add_epic_column

# Reset (borra datos — dev only)
npx prisma migrate reset
```

### Staging / Production

```bash
# Aplicar migraciones sin reset (preserva datos)
npm run db:migrate:prod

# Ver estado de migraciones
npx prisma migrate status
```

---

## Monitoreo y Alertas

### Development

- No se requiere monitoreo

### Staging

- **Sentry**: Captura errors, alertar a @security si > 10 errors/hora
- **Uptime**: Verificar endpoint `/health` cada 5 minutos
- **Database**: Monitor de espacio libre (alertar si > 80% usado)

### Production

- **Sentry**: Alertar inmediatamente si error en ruta crítica (login, pago)
- **Uptime**: Verificar `/health` cada 1 minuto
- **Database**: Backup automático diario, alertar si backup falla
- **Stripe Webhooks**: Monitorear tasa de fallo, alertar si > 5% failed
- **Performance**: Alertar si response time > 1 segundo en rutas críticas

---

## Checklist Pre-Producción

Antes de deployar a production por primera vez:

- [ ] JWT_SECRET es alfanumérico seguro (mínimo 32 chars)
- [ ] Stripe está en LIVE mode
- [ ] Firebase proyecto está configurado para production
- [ ] CORS está restringido a dominio prod
- [ ] HTTPS forzado en todas las rutas
- [ ] Rate limiting configurado (100 req/min por IP)
- [ ] Logs no expongan credenciales
- [ ] Database tiene backup automático
- [ ] Sentry está configurado
- [ ] Dominio personalizado apunta a Vercel (frontend) + Railway (backend)
- [ ] DNS propagado (verificar con `nslookup`)
- [ ] SSL certificado válido (Let's Encrypt automático en Vercel)

