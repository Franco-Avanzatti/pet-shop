# 🐶 Scooby-Doo Petshop – Backend API

Backend de un **ecommerce Petshop** desarrollado con **NestJS**, **Prisma** y **PostgreSQL (Neon)**.  
Proyecto pensado para mostrar **arquitectura backend real**, autenticación segura y buenas prácticas.

---

## 🚀 Tech Stack
- NestJS 11 + TypeScript  
- Prisma ORM  
- PostgreSQL (Neon)  
- JWT + Passport  
- Swagger (OpenAPI)  
- Docker + Docker Compose  
- Jest + Supertest  

---

## ▶️ Cómo levantar el proyecto (Docker)

1️⃣ Crear archivo `.env` desde `.env.example`  
2️⃣ Ejecutar:
```bash
docker compose up --build
```

📍 API: http://localhost:3001  
📚 Swagger: http://localhost:3001/api/docs  

---

## 🔐 Autenticación
- JWT con access & refresh token  
- Tokens también enviados como cookies httpOnly  
- Roles: `USER` y `ADMIN`  

---

## 👤 Usuarios de prueba

### Admin
- Email: **admin@demo.com**
- Password: **Admin123**

### User
- Email: **user@demo.com**
- Password: **User123**

(Se crean con seed de Prisma)

---

## 🛒 Funcionalidades
- Auth (login / register)
- Productos (CRUD – protegido por roles)
- Carrito por usuario
- Pedidos
- Validaciones con DTOs
- API documentada con Swagger

---

## 🧪 Testing
```bash
npm run testt:e2e
```

---

## 🧠 Arquitectura
- Modular (NestJS best practices)
- Tipado estricto (sin `any`)
- Prisma como capa de datos
- Pensado para escalar

---