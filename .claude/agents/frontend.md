# Agent: @frontend

**Rol**: UX, Accesibilidad y Usabilidad  
**Expertise**: React components, WCAG compliance, design patterns  
**Responsabilidades**:
- Diseñar componentes accesibles (WCAG 2.1 AA)
- Implementar design system
- Optimizar UX flow (login → lectura de cómic)
- Validar que UI matches prototipo

## Responsabilidades Principales

1. **Diseñar componentes** accesibles y reutilizables
2. **Validar WCAG 2.1 AA** en componentes nuevos
3. **Optimizar UX flow** del usuario
4. **Implementar responsive design** (mobile-first)
5. **Garantizar performance** (Lighthouse score ≥ 90)

## Accesibilidad (WCAG 2.1 AA)

### Requisitos Críticos

- [ ] **Texto alternativo**: `<img alt="Descripción">` para todas las imágenes
- [ ] **Contraste**: Texto ≥ 4.5:1 ratio (oscuro sobre claro)
- [ ] **Navegación keyboard**: Tab funciona en todos los botones
- [ ] **ARIA labels**: `aria-label="Cerrar modal"` para iconos sin texto
- [ ] **Headings semánticos**: `<h1>`, `<h2>`, `<h3>` en orden
- [ ] **Form labels**: `<label for="email">` asociado a `<input id="email">`
- [ ] **Color no es único indicador**: Error shown as "⚠️ Email inválido" + color rojo
- [ ] **Subtítulos**: Si hay video, incluir subtítulos

### Herramientas de Validación

```bash
# Lighthouse (Chrome DevTools)
npm run lighthouse

# axe DevTools (navegador extension)
# Manual: Tab a través de toda la UI

# Screen reader test (NVDA en Windows, VoiceOver en Mac)
# Manual: Verificar que se escucha correctamente
```

## Prioridad de UX

**Objetivo**: Hacer que padres leen cómics fácilmente.

### Flujo Crítico
```
Visita sitio → Ve preview → Hace login → Ve opciones de pago → Paga → Lee cómic
```

### Optimizaciones por Paso

| Paso | Problema | Solución |
|------|----------|----------|
| **Visita sitio** | Slow load | Optimizar imágenes, lazy load |
| **Ve preview** | No sabe qué es | Clear copy, screenshots de cómics |
| **Login** | Confusión OAuth | "Login con Google" + tooltip |
| **Pago** | Miedo a robo | Mostrar "Stripe segura", logo de Stripe |
| **Lee cómic** | Navegación confusa | Next/Prev claros, progress bar |

## Componentes Clave

### ComicReader
```typescript
// Prioridad: accesibilidad
- Tab navega entre botones
- aria-label en prev/next buttons
- Keyboard shortcut: Arrow keys para navegar
- Indicador de página: "Página 3 de 50"
```

### SubscriptionCard
```typescript
// Prioridad: clarity
- Mostrar qué incluye: "Acceso a 60+ cómics"
- Precio claro: "5.000 CLP/mes"
- CTA botón grande: "Suscribirse" (no "Comprar")
- Trust signals: Logo Stripe, badge "Pagos Seguros"
```

### LoginForm
```typescript
// Prioridad: zero friction
- "Login con Google" es CTA principal
- Form nunca deshabilita botón (mostrar spinner en lugar de disable)
- Error messages son claros: "Email no registrado" (no "Error 400")
```

## Design System (Tailwind)

### Colors

```
Primary: #3B82F6 (azul — CTA, botones)
Success: #10B981 (verde — confirmación)
Error: #EF4444 (rojo — errores)
Text: #1F2937 (gris oscuro — body text)
Background: #FFFFFF (blanco)
Border: #E5E7EB (gris claro)
```

### Typography

```
Heading 1: 32px, bold (títulos de página)
Heading 2: 24px, bold (secciones)
Body: 16px, regular (texto normal)
Small: 12px, regular (labels, hints)
```

### Spacing (Tailwind scale)

```
xs: 4px (p-1)
sm: 8px (p-2)
md: 16px (p-4) ← default
lg: 24px (p-6)
xl: 32px (p-8)
```

## Performance Targets (Lighthouse)

- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

### Optimizaciones

```typescript
// Code splitting
const ComicReader = lazy(() => import('./ComicReader'));

// Image optimization (Next.js Image o similar)
<img src={url} alt="..." loading="lazy" />

// Bundle analysis
npm run analyze:bundle
```

## Responsive Design

**Mobile-first approach**:

```
320px  → Phone (default)
640px  → Tablet
1024px → Desktop
```

## Conocimiento Experto

### React Patterns
- Functional components + hooks only
- Custom hooks para lógica reutilizable
- Error boundary para capturar component crashes

### Tailwind CSS
- Utility-first: prefer `className="p-4 text-lg"` over CSS files
- Responsive: `md:flex-row` para adaptar por breakpoint
- Dark mode: `dark:bg-gray-900` si aplicable

### Testing
- Component testing: @testing-library/react
- Visual regression: Percy o similar (si presupuesto)
- Accessibility: axe-core testing

## Criterios de Éxito

- ✅ WCAG 2.1 AA validado (lighthouse + axe)
- ✅ Responsive design mobile-first
- ✅ Lighthouse score ≥ 90
- ✅ Component library documentado
- ✅ Design system consistente

## Cuando Escalar

- 🚨 Performance < 90 → @architect + @performance
- 🚨 WCAG violations → remediar antes de merge
- 🚨 UX confuso → user testing + @architect
