# Estructura del Frontend (React + TypeScript)

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── App.tsx                    # Componente principal
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Estilos globales
│   │
│   ├── components/                # 🧩 Componentes reutilizables
│   │   ├── ui/                    # Componentes UI básicos
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   └── Loading.tsx
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   └── forms/                 # Formularios reutilizables
│   │       ├── PatientForm.tsx
│   │       ├── OwnerForm.tsx
│   │       └── VisitForm.tsx
│   │
│   ├── pages/                     # 📄 Páginas principales
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── ForgotPasswordPage.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardPage.tsx
│   │   ├── owners/
│   │   │   ├── OwnersListPage.tsx
│   │   │   ├── OwnerDetailPage.tsx
│   │   │   └── CreateOwnerPage.tsx
│   │   ├── patients/
│   │   │   ├── PatientsListPage.tsx
│   │   │   ├── PatientDetailPage.tsx
│   │   │   └── CreatePatientPage.tsx
│   │   ├── visits/
│   │   │   ├── VisitsListPage.tsx
│   │   │   ├── VisitDetailPage.tsx
│   │   │   └── CreateVisitPage.tsx
│   │   └── users/                 # Solo para admins
│   │       ├── UsersListPage.tsx
│   │       └── CreateUserPage.tsx
│   │
│   ├── services/                  # 🌐 API calls
│   │   ├── api.ts                 # Configuración base de axios
│   │   ├── auth.service.ts        # Autenticación
│   │   ├── users.service.ts       # CRUD usuarios
│   │   ├── owners.service.ts      # CRUD propietarios
│   │   ├── patients.service.ts    # CRUD pacientes
│   │   └── visits.service.ts      # CRUD visitas
│   │
│   ├── hooks/                     # 🎣 Custom hooks
│   │   ├── useAuth.ts            # Hook de autenticación
│   │   ├── useApi.ts             # Hook para llamadas API
│   │   ├── usePatients.ts        # Hook para gestión de pacientes
│   │   ├── useOwners.ts          # Hook para gestión de propietarios
│   │   └── useVisits.ts          # Hook para gestión de visitas
│   │
│   ├── context/                   # 📊 Context providers
│   │   ├── AuthContext.tsx       # Estado de autenticación
│   │   └── ThemeContext.tsx      # Tema de la aplicación
│   │
│   ├── types/                     # 📝 Tipos TypeScript
│   │   ├── auth.types.ts         # Tipos de autenticación
│   │   ├── user.types.ts         # Tipos de usuarios
│   │   ├── owner.types.ts        # Tipos de propietarios
│   │   ├── patient.types.ts      # Tipos de pacientes
│   │   ├── visit.types.ts        # Tipos de visitas
│   │   └── api.types.ts          # Tipos de respuestas API
│   │
│   ├── utils/                     # 🔧 Utilidades
│   │   ├── constants.ts          # Constantes de la app
│   │   ├── formatters.ts         # Formateo de datos
│   │   ├── validators.ts         # Validaciones frontend
│   │   └── storage.ts            # LocalStorage helpers
│   │
│   ├── styles/                    # 🎨 Estilos
│   │   ├── globals.css
│   │   ├── variables.css         # Variables CSS
│   │   └── components.css        # Estilos de componentes
│   │
│   └── assets/                    # 🖼️ Recursos estáticos
│       ├── images/
│       └── icons/
│
├── .env.example                   # Variables de entorno
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## 📝 Archivos Clave del Frontend

### Páginas Principales
- **auth/** → Login y autenticación
- **dashboard/** → Panel principal con estadísticas
- **owners/** → Gestión completa de propietarios
- **patients/** → Gestión completa de pacientes  
- **visits/** → Registro y historial de visitas
- **users/** → Gestión de usuarios (solo admins)

### Servicios API
- **api.ts** → Configuración base con interceptors para auth
- **\*.service.ts** → Llamadas específicas a cada endpoint del backend
- **hooks/** → Custom hooks para manejo de estado y API calls

### Componentes Reutilizables
- **ui/** → Componentes básicos (Button, Input, Table, etc.)
- **forms/** → Formularios complejos reutilizables
- **layout/** → Estructura general de la aplicación

### Biblioteca UI
- **MUI (Material UI):** Se usará MUI para los componentes de interfaz (botones, tablas, inputs, modals, icons). Integrar MUI facilita la consistencia visual y acelera el desarrollo. Recomendado:
	- Instalar: `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
	- Crear un `ThemeProvider` en `src/main.tsx` y exponer el tema mediante `ThemeContext` si quieres combinar con tokens propios.
	- Preferir los componentes `MUI` en `components/ui/` y envolver inputs con `react-hook-form` para validación.

### Estado y Tipos
- **context/** → Context providers para estado global
- **types/** → Interfaces TypeScript para type safety
- **utils/** → Funciones utilitarias y helpers