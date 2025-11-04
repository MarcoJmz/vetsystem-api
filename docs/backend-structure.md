# Estructura del Backend (NestJS)

```
backend/
├── src/
│   ├── app.module.ts              # Módulo principal
│   ├── main.ts                    # Entry point
│   │
│   ├── auth/                      # 🔐 Autenticación
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       └── register.dto.ts
│   │
│   ├── users/                     # 👥 Gestión de usuarios
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   │
│   ├── owners/                    # 🏠 Propietarios
│   │   ├── owners.module.ts
│   │   ├── owners.controller.ts
│   │   ├── owners.service.ts
│   │   ├── entities/
│   │   │   └── owner.entity.ts
│   │   └── dto/
│   │       ├── create-owner.dto.ts
│   │       └── update-owner.dto.ts
│   │
│   ├── patients/                  # 🐕 Pacientes
│   │   ├── patients.module.ts
│   │   ├── patients.controller.ts
│   │   ├── patients.service.ts
│   │   ├── entities/
│   │   │   └── patient.entity.ts
│   │   └── dto/
│   │       ├── create-patient.dto.ts
│   │       └── update-patient.dto.ts
│   │
│   ├── visits/                    # 🏥 Visitas médicas
│   │   ├── visits.module.ts
│   │   ├── visits.controller.ts
│   │   ├── visits.service.ts
│   │   ├── entities/
│   │   │   └── visit.entity.ts
│   │   └── dto/
│   │       ├── create-visit.dto.ts
│   │       └── update-visit.dto.ts
│   │
│   ├── common/                    # 🔧 Utilidades compartidas
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   └── response.interceptor.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   └── types/
│   │       └── user-types.enum.ts
│   │
│   └── database/                  # 🗄️ Configuración BD
│       ├── database.module.ts
│       └── prisma.service.ts
│
├── prisma/
│   ├── schema.prisma              # Schema de la base de datos
│   ├── migrations/                # Migraciones automáticas
│   └── seeds/
│       └── admin-user.seed.ts     # Datos iniciales
│
├── test/                          # 🧪 Tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env.example                   # Variables de entorno
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

## 📝 Archivos Clave del Backend

### Módulos Principales
- **auth/** → Manejo de JWT, guards, strategies
- **users/** → CRUD usuarios con roles admin/staff  
- **owners/** → CRUD propietarios de mascotas
- **patients/** → CRUD pacientes con relaciones
- **visits/** → CRUD visitas médicas

### Utilidades Compartidas
- **guards/** → Protección de rutas por autenticación y roles
- **decorators/** → Decoradores personalizados para roles y usuario actual
- **pipes/** → Validación automática de DTOs
- **filters/** → Manejo centralizado de errores

### Base de Datos
- **prisma/** → ORM, migraciones y seeds
- **database/** → Servicio de conexión a BD