# 🛒 Ecommerce Backend

Backend de un ecommerce desarrollado con **NestJS**, **Prisma** y **PostgreSQL (Neon)**.  
Incluye autenticación con **JWT**, manejo de usuarios, productos y carrito de compras, siguiendo buenas prácticas de arquitectura y tipado con TypeScript.

---

## 🚀 Tecnologías utilizadas

- **NestJS 11** – Framework backend
- **TypeScript** – Tipado fuerte
- **Prisma ORM** – Acceso a datos
- **PostgreSQL** – Base de datos (Neon)
- **Passport + JWT** – Autenticación
- **bcrypt** – Hash de contraseñas
- **class-validator / class-transformer** – Validación de DTOs
- **Jest + Supertest** – Testing
- **ESLint + Prettier** – Calidad de código

---

## 📂 Estructura del proyecto

```
src/
├── auth/            # Login, register, JWT strategies
├── users/           # Usuarios
├── products/        # Productos
├── cart/            # Carrito de compras
├── prisma/          # Prisma service
├── common/          # Utilidades compartidas
└── main.ts          # Bootstrap de la app
```

---

## ⚙️ Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/ecommerce-backend.git
cd ecommerce-backend
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crear un archivo `.env` en la raíz:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require"
JWT_SECRET="supersecretjwt"
```

---

## 🧬 Prisma

### Generar cliente
```bash
npx prisma generate
```

### Ejecutar migraciones
```bash
npx prisma migrate dev
```

---

## ▶️ Ejecutar el proyecto

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

---

## 🧪 Testing

```bash
npm run test
npm run test:watch
npm run test:cov
```

---

## 🔐 Autenticación

- Autenticación basada en **JWT**
- Estrategias:
  - `local` (login)
  - `jwt` (rutas protegidas)
- El usuario autenticado se obtiene desde `req.user.sub`

---

## 🛒 Funcionalidades principales

### Productos
- Crear, listar, obtener, actualizar y eliminar productos

### Carrito
- Obtener carrito del usuario autenticado
- Agregar productos
- Actualizar cantidades
- Evita duplicados usando clave compuesta (`cartId + productId`)

### Usuarios
- Registro y login
- Roles (`USER`, `ADMIN`)

---

## 📌 Scripts disponibles

| Script | Descripción |
|------|------------|
| `start:dev` | Modo desarrollo |
| `build` | Compilar proyecto |
| `start:prod` | Ejecutar build |
| `lint` | ESLint |
| `format` | Prettier |
| `test` | Tests unitarios |

---