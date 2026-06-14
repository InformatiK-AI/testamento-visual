---
project: "Cómics Bíblicos Digitales"
generated-by: /genesis
genesis-version: 2.0
date: 2026-06-11
author: Host
---

# Arquitectura del Sistema

**Tipo**: Web App (SPA) + Backend API  
**Patrón**: Monolito modular — Frontend separado del Backend, ambos en un repositorio

---

## Capas del Sistema

```
┌─────────────────────────────────────────┐
│   Navegador (Cliente)                   │
│  ┌───────────────────────────────────┐  │
│  │ React SPA (Frontend)              │  │
│  │  ├─ Pages (Comicos, Login, Perfil)  │
│  │  ├─ Components (Reader, Cards)   │  │
│  │  ├─ State (Zustand)               │  │
│  │  └─ API Client (Axios)            │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↓ HTTPS ↓
┌─────────────────────────────────────────┐
│   Backend (Node.js + Express)           │
│  ┌───────────────────────────────────┐  │
│  │ Controllers & Routes              │  │
│  │  ├─ GET /api/comics (lista)       │  │
│  │  ├─ POST /api/auth/login          │  │
│  │  ├─ POST /api/subscriptions       │  │
│  │  └─ Webhooks (Stripe)             │  │
│  ├───────────────────────────────────┤  │
│  │ Middleware                        │  │
│  │  ├─ Auth (JWT/Firebase)           │  │
│  │  ├─ Rate Limiting                 │  │
│  │  ├─ Validation (Zod)              │  │
│  │  └─ Error Handling                │  │
│  ├───────────────────────────────────┤  │
│  │ Services & Logic                  │  │
│  │  ├─ PaymentService (Stripe)       │  │
│  │  ├─ ComicsService                 │  │
│  │  ├─ SubscriptionService           │  │
│  │  └─ UserService                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↓ SQL ↓
┌─────────────────────────────────────────┐
│   PostgreSQL (Database)                 │
│  ├─ users (id, email, created_at)      │
│  ├─ subscriptions (id, user_id, plan)  │
│  ├─ comics (id, title, pages, epoch)   │
│  └─ transactions (id, amount, status)  │
└─────────────────────────────────────────┘

External Services:
  ├─ Firebase Auth (OAuth login)
  ├─ Stripe / MercadoPago (Pagos)
  └─ Vercel / Railway (Hosting)
```

---

## Flujo de Datos

### 1. Login con Google (Firebase Auth)

```
Usuario → [Click "Login con Google"] → Firebase Auth UI
         → Recibe JWT token → Envía a Backend
         → Backend valida JWT → Devuelve sesión
         → Frontend guarda token en localStorage
```

### 2. Compra de Suscripción

```
Usuario → [Click "Suscribirse"] → Checkout de Stripe
        → Usuario ingresa tarjeta → Stripe procesa
        → Webhook a Backend → Backend confirma suscripción
        → Backend actualiza DB (user.subscription_status = active)
        → Frontend muestra acceso a cómics
```

### 3. Lectura de Cómics

```
Usuario → [Click "Leer Génesis"] → GET /api/comics/1
        → Backend valida JWT + suscripción activa
        → Backend devuelve páginas del cómic (URLs de imágenes)
        → Frontend renderiza cómic en Viewer
        → Usuario lee, swipe entre páginas
```

---

## Decisiones Arquitectónicas

### ADR-001: SPA + Backend Separados

**Contexto**: Frontend prioridad UX, backend debe manejar pagos complejos.

**Decisión**: React SPA + Express Backend en mismo repo.

**Pros**:
- Frontend independiente, deploy rápido (Vercel)
- Backend puede escalar sin frontend
- Reutilizar API para apps móviles futuras

**Contras**:
- Más complejidad operacional (2 deploy, CORS)
- Sincronización de versiones necesaria

**Reversibilidad**: MODERADA (habría que refactorizar a BFF o monolito)

---

### ADR-002: Firebase Auth en lugar de Backend Custom

**Contexto**: MVP rápido, login con Google es requisito.

**Decisión**: Usar Firebase Auth (OAuth2) + JWT en Backend.

**Pros**:
- Login con Google sin custom auth
- Gestión de credenciales delegada
- Escalable sin costo inicial

**Contras**:
- Vendor lock-in (Firebase)
- Token expiry management en frontend

**Reversibilidad**: FÁCIL (migrar a Auth0 después)

---

### ADR-003: Stripe para Pagos

**Contexto**: Suscripción recurrente 5K CLP, requiere confianza.

**Decisión**: Stripe API + Webhooks para confirmación.

**Pros**:
- PCI compliance manejado por Stripe
- Webhooks confiables para suscripciones
- Mejor documentación

**Contras**:
- Costo de transacción (~2.9% + $0.30 USD)
- MercadoPago podría ser más barato en LATAM

**Reversibilidad**: MODERADA (migración de clientes requiere cambio de tarjeta)

---

### ADR-004: Monolito Modular, No Microservicios

**Contexto**: MVP temprano, no escalamos a 1M users aún.

**Decisión**: Un repositorio con `/src/frontend` y `/src/backend`, ambos deployados juntos.

**Pros**:
- Más simple operacionalmente
- Debugging más fácil
- Compartir tipos TypeScript

**Contras**:
- Si backend cae, todo cae (mitigable con autoscaling)
- Scaling vertical en lugar de horizontal

**Reversibilidad**: DIFÍCIL (habría que extraer servicios después)

---

## Pendiente de Refinamiento

> Este documento contiene la arquitectura base inferida de `/genesis`.  
> Ejecutar `/brainstorm` para completar:
> - Modelo de dominio detallado (tablas, relaciones específicas)
> - Componentes React específicos (estructura de páginas)
> - API endpoints detallados (request/response)
> - Más ADRs según evoluciona el proyecto

---

## Escalabilidad Futura

Si el proyecto crece:

1. **Separar backend a microservicios**: PaymentService, ComicsService, UserService (Kafka/RabbitMQ)
2. **Cache distribuido**: Redis para sesiones + caché de cómics
3. **CDN**: CloudFlare para imágenes de cómics (global distribution)
4. **Database sharding**: Por geografía o por user (si >100M rows)

