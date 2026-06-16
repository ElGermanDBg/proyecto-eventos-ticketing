# Guía de Despliegue — Vercel + Neon.tech

## Requisitos
- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Neon.tech](https://neon.tech) (base de datos PostgreSQL gratuita)
- Repositorio en GitHub

## 1. Base de Datos (Neon.tech)
1. Crear cuenta en neon.tech
2. Crear un proyecto nuevo
3. Copiar las credenciales de conexión (host, database, user, password)

## 2. Backend en Vercel
1. Ir a vercel.com → Add New → Project
2. Importar el repositorio de GitHub
3. Root Directory: `backend`
4. Framework Preset: `Other`
5. Agregar variables de entorno:
   - `DB_NAME` — nombre de la base de datos de Neon
   - `DB_USER` — usuario de Neon
   - `DB_PASSWORD` — contraseña de Neon
   - `DB_HOST` — host de Neon
   - `JWT_SECRET` — clave secreta para firmar tokens
   - `FRONTEND_URL` — URL del frontend (se agrega después)
6. Deploy

## 3. Frontend en Vercel
1. Ir a vercel.com → Add New → Project
2. Importar el mismo repositorio
3. Root Directory: `frontend`
4. Framework Preset: `Vite`
5. Agregar variable de entorno:
   - `VITE_API_URL` — URL del backend + `/api` (ej: `https://mi-backend.vercel.app/api`)
6. Deploy

## 4. Conectar CORS
1. Ir al proyecto del backend → Settings → Environment Variables
2. Agregar `FRONTEND_URL` con la URL del frontend
3. Redeploy el backend

## URLs de Producción
- **Frontend:** https://proyecto-eventos-ticketing-u1cc.vercel.app
- **Backend API:** https://proyecto-eventos-ticketing.vercel.app/api
