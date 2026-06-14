# CLAUDE.md — Cómics Bíblicos Digitales

**Fecha generada**: 2026-06-11  
**Stack**: React + Node.js + PostgreSQL + Stripe/MercadoPago  
**Tipo**: Web App (SPA) con API Backend  
**Equipo**: developer, architect, qa, frontend, security

---

## 🎯 Idea de Negocio

Plataforma web de cómics bíblicos digitales diseñada para padres cristianos/católicos de habla hispana que quieren enseñar la Biblia completa (Génesis a Apocalipsis) a adolescentes de forma atractiva.

**Propuesta de valor**: Cómics digitales con personajes vestidos con vestuario histórico de cada época bíblica, haciendo la lectura inmersiva, educativa y visual.

**Modelo de negocio**: Suscripción 5.000 CLP/mes. Usuarios: padres (primario) + iglesias (secundario).

---

## 📊 Métricas de Éxito

- **Métrica clave**: Tasa de conversión ≥ 3% (visitas → suscriptores)
- **Proyección año 1**: 7.000-8.000 suscriptores = ~420M CLP ingresos
- **Costos operativos**: 100K CLP/mes (plataforma + publicidad)
- **Canales**: Publicidad en redes sociales (Instagram, TikTok, Facebook) + YouTube orgánico

---

## 🏗️ Arquitectura

**Frontend**: React SPA  
**Backend**: Node.js + Express (o FastAPI)  
**Database**: PostgreSQL  
**Payments**: Stripe o MercadoPago (soporta CLP)  
**Auth**: Firebase Auth o Auth0  
**Hosting**: Vercel (frontend) + Railway/Render (backend)  

**Prioridades técnicas** (en orden):
1. UX — interfaz atractiva para padres y adolescentes
2. Performance — carga rápida de cómics (imágenes optimizadas)
3. Velocidad de desarrollo — MVP en <4 semanas

---

## 👥 Equipo de Agentes

| Agente | Responsabilidad | Modelo |
|--------|-----------------|--------|
| `@developer` | Implementación de código con protocolo RADAR | Opus |
| `@architect` | Decisiones de diseño, trade-offs técnicos | Opus |
| `@qa` | Testing, quality assurance, security gate | Sonnet |
| `@frontend` | UX, accesibilidad (WCAG, ARIA), patrones | Sonnet |
| `@security` | Pagos seguros, autenticación, OWASP top 10 | Opus |

---

## 📋 Flujo de Desarrollo

```
/genesis ← Estas aquí
  ↓
/brainstorm — Diseña la primera feature (landing page + login + pago básico)
  ↓
/create-issues — Convierte el design en issues
  ↓
/build — Implementa la feature
  ↓
/qa — Testing y security gate
  ↓
/merge — Pull request + review
  ↓
/deploy-in-one-command — Publica a producción
  ↓
/mvp-accelerator — Lanza MVP completo
```

---

## 🚀 Próximos Pasos

1. **Ejecutar `/brainstorm`** — Diseña tu MVP: landing page + login con Google + sistema de pagos básico
2. **Crear issues** — Descompón el design en tasks ejecutables
3. **Implementar** — Usa `/build` o `/plan` para desarrollo aislado
4. **Validar con usuarios** — Mide tasa de conversión (métrica clave)
5. **Iterar** — Ajusta según feedback

---

## 🔐 Notas de Seguridad

Este proyecto maneja:
- ✅ Autenticación de usuarios (credenciales)
- ✅ Pagos recurrentes (PCI compliance requerido)
- ✅ Datos personales (padres, iglesias)

**Checklist de seguridad antes de producción**:
- [ ] HTTPS en todas las rutas
- [ ] Validación de entrada en backend
- [ ] Rate limiting en endpoints de pago
- [ ] Cifrado de contraseñas (bcrypt mínimo 12 rounds)
- [ ] JWT o sesiones seguras para auth
- [ ] Logs auditables de transacciones de pago
- [ ] GDPR compliance si hay usuarios en EU

Ver `.king/knowledge/environments.md` para configuración de secretos por ambiente.

---

## 📁 Estructura de Archivos

```
.
├── CLAUDE.md                    # Esta documentación
├── .env.example                 # Variables de entorno
├── .gitignore                   # Archivos no versionados
├── package.json                 # Dependencias (frontend + backend)
├── src/
│   ├── frontend/               # React SPA
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── backend/                # Node.js API
│       ├── routes/
│       ├── controllers/
│       ├── middleware/
│       └── server.js
├── .king/
│   ├── knowledge/              # Documentación del framework
│   │   ├── stack.md
│   │   ├── architecture.md
│   │   ├── conventions.md
│   │   └── environments.md
│   ├── sdd/                    # Spec-Driven Development
│   │   ├── config.yaml
│   │   ├── specs/
│   │   └── archive/
│   └── hooks/                  # Git hooks + Jarvis
├── .claude/
│   ├── agents/                 # Definiciones de agentes
│   │   ├── developer.md
│   │   ├── architect.md
│   │   ├── qa.md
│   │   ├── frontend.md
│   │   └── security.md
│   └── settings.json           # Configuración local
└── docs/
    ├── idea-validation/        # Reportes de validación
    ├── lean-canvas/            # Lean Canvas del producto
    └── architecture/           # ADRs y decisiones técnicas
```

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm install
npm run dev              # Frontend + backend en paralelo

# Testing
npm run test            # Jest + Testing Library
npm run test:e2e        # Cypress o Playwright

# Linting
npm run lint            # ESLint
npm run format          # Prettier

# Deployment
npm run build           # Compilar para producción
npm run start           # Iniciar en producción

# Framework
/genesis                # Reinicializar configuración
/brainstorm             # Diseñar nueva feature
/plan                   # Planificar con agentes
/build                  # Implementar feature
/qa                     # Testing + security
```

---

## 📚 Recursos

- **Framework**: King Framework (`/help` para más skills)
- **Stack Tech**: React, Express.js, PostgreSQL, Stripe
- **Documentación**: `.king/knowledge/` (architecture, conventions, environments)
- **Agentes**: `.claude/agents/` (especialistas de tu proyecto)

---

## ⚙️ Configuración Local

Después de clonar el proyecto:

```bash
# 1. Copiar variables de entorno
cp .env.example .env

# 2. Completar secretos
# Edita .env con:
#   - DATABASE_URL (PostgreSQL)
#   - STRIPE_SECRET_KEY o MERCADOPAGO_KEY
#   - FIREBASE_SERVICE_ACCOUNT (o Auth0 config)

# 3. Instalar dependencias
npm install

# 4. Inicializar base de datos
npm run db:migrate

# 5. Iniciar desarrollo
npm run dev
```

---

**Generado por `/genesis` — King Framework**  
**Mantén este archivo actualizado con decisiones arquitectónicas y cambios de dirección.**
