# Sistema de Gestión Veterinaria

Sistema completo de gestión para clínicas veterinarias desarrollado con tecnologías modernas. Incluye gestión de pacientes, propietarios, visitas y usuarios del sistema.

## 🚀 Stack Tecnológico

### Backend
- **Framework:** NestJS + TypeScript
- **Base de datos:** PostgreSQL  
- **ORM:** Prisma
- **Autenticación:** JWT + Refresh Tokens
- **Validación:** Class-validator + Class-transformer

### Frontend  
- **Framework:** React + TypeScript
- **Routing:** React Router
- **Estado:** Context API / React Query
- **Styling:** CSS Modules / Styled Components (TBD)
- **Build:** Vite

### Desarrollo
- **Linting:** ESLint + Prettier
- **Testing:** Jest + React Testing Library
- **Git:** Conventional Commits
- **Environment:** Node.js 18+

## 📋 Funcionalidades del MVP

### Gestión de Usuarios
- [x] Autenticación con JWT + Refresh tokens
- [x] Dos tipos de usuarios: Admin y Staff
- [x] Admin endpoint para crear nuevos usuarios
- [x] Seed script para crear usuario admin inicial

### Gestión de Propietarios
- [x] CRUD completo de propietarios
- [x] Información de contacto (nombre, teléfono, email, dirección)
- [x] Búsqueda y filtrado

### Gestión de Pacientes
- [x] CRUD completo de pacientes
- [x] Relación con propietarios
- [x] Información básica (nombre, especie, raza, fecha nacimiento)
- [x] Historial de visitas

### Gestión de Visitas
- [x] Registro de visitas médicas
- [x] Diagnósticos y tratamientos
- [x] Notas del veterinario
- [x] Relación con paciente y staff

## 🏗️ Arquitectura de la Base de Datos

```sql
-- Usuarios del sistema (Staff y Admins)
Users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL, 
  name VARCHAR NOT NULL,
  role ENUM('admin', 'staff') NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Propietarios de mascotas
Owners (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  phone VARCHAR,
  email VARCHAR,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pacientes (mascotas)
Patients (
  id UUID PRIMARY KEY,
  owner_id UUID REFERENCES Owners(id),
  name VARCHAR NOT NULL,
  species VARCHAR NOT NULL,
  breed VARCHAR,
  birth_date DATE,
  weight DECIMAL(5,2),
  microchip VARCHAR,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Visitas médicas
Visits (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES Patients(id),
  user_id UUID REFERENCES Users(id),
  visit_date TIMESTAMP NOT NULL,
  reason VARCHAR NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  notes TEXT,
  cost DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Refresh tokens para autenticación
RefreshTokens (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES Users(id),
  token VARCHAR NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Sistema de Autenticación

### Roles y Permisos

**Administradores:**
- ✅ Crear, editar, eliminar usuarios
- ✅ Acceso completo a todos los módulos
- ✅ Configuración del sistema
- ✅ Reportes avanzados

**Staff:**
- ✅ CRUD Pacientes, Propietarios, Visitas
- ✅ Reportes básicos
- ❌ NO pueden gestionar usuarios
- ❌ NO acceso a configuración

### Flujo de Autenticación
1. Login → Access Token (30 min) + Refresh Token (7 días)
2. Access Token en header: `Authorization: Bearer <token>`
3. Auto-refresh cuando access token expira
4. Logout → Invalidar refresh token

## 📁 Estructura del Proyecto

```
vet-system/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/           # Módulo de autenticación
│   │   ├── users/          # Gestión de usuarios
│   │   ├── owners/         # Gestión de propietarios  
│   │   ├── patients/       # Gestión de pacientes
│   │   ├── visits/         # Gestión de visitas
│   │   ├── common/         # Utilidades compartidas
│   │   └── database/       # Configuración Prisma
│   ├── prisma/
│   │   ├── schema.prisma   # Schema de la BD
│   │   └── seeds/          # Datos iniciales
│   └── package.json
├── frontend/               # App React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas principales
│   │   ├── services/       # Llamadas a API
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # Tipos TypeScript
│   │   └── utils/          # Utilidades
│   └── package.json
├── docs/                   # Documentación adicional
└── README.md
```

## 🎯 Plan de Implementación (4 semanas)

### Semana 1: Fundación
- **Backend:** Setup NestJS + Prisma + Auth módulo completo
- **Frontend:** Setup React + routing básico
- **Entregable:** Login/logout funcional

### Semana 2: CRUD Básico  
- **Backend:** Módulos Users, Owners, Patients
- **Frontend:** Páginas de listado y formularios
- **Entregable:** Gestión completa de propietarios y pacientes

### Semana 3: Visitas y Relaciones
- **Backend:** Módulo Visits + validaciones complejas
- **Frontend:** Historial de pacientes + formulario de visitas
- **Entregable:** Flujo completo de registro de visita

### Semana 4: Polish y Deploy
- **Backend:** Testing + optimizaciones
- **Frontend:** UX improvements + responsive
- **Entregable:** Sistema completo deployado

## 🚦 Estados del Proyecto

- [ ] **Setup inicial** - Configuración del entorno
- [ ] **Autenticación** - Sistema de login completo
- [ ] **Gestión básica** - CRUD de entidades principales
- [ ] **Relaciones** - Visitas y historiales  
- [ ] **Production ready** - Testing y deploy

## 🔄 Migración Futura (Portal de Clientes)

El sistema está diseñado para migrar fácilmente a un portal de clientes:

1. **Customer_Profiles** → Nueva tabla que vincule Users con Owners
2. **Customer role** → Nuevo tipo de usuario con permisos limitados  
3. **Public endpoints** → APIs para que clientes vean info de sus mascotas
4. **Notificaciones** → Sistema de recordatorios de citas

## 📞 Contacto

**Desarrollador:** [Tu nombre]  
**Email:** arellanes.id@gmail.com  
**GitHub:** [Tu perfil]

---

*Última actualización: Septiembre 2025*