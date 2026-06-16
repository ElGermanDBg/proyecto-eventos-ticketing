# Guía de Despliegue en Vercel

## ¿Qué es Vercel?
[Vercel](https://vercel.com) es una plataforma en la nube que permite desplegar aplicaciones web modernas de forma gratuita. Es ideal para frontends con React/Vite y soporta backends Node.js mediante Serverless Functions.

---

## Arquitectura del Despliegue

Este proyecto se despliega como **dos proyectos separados** en Vercel:

| Servicio | Tipo | Directorio |
|----------|------|-----------|
| **Frontend** | Static Site (Vite/React) | `frontend/` |
| **Backend** | Serverless Function (Express) | `backend/` |

Para la base de datos PostgreSQL se utiliza un servicio externo gratuito como **Neon.tech**.

---

## Paso 1: Crear la Base de Datos PostgreSQL (Neon.tech)

1. Ve a [neon.tech](https://neon.tech) y crea una cuenta gratuita.
2. Crea un nuevo proyecto y una base de datos llamada `eventos_db`.
3. Copia los datos de conexión que Neon te proporciona:
   - `DB_HOST` (ejemplo: `ep-xxx-xxx.us-east-2.aws.neon.tech`)
   - `DB_NAME` (ejemplo: `eventos_db`)
   - `DB_USER` (ejemplo: `eventos_db_owner`)
   - `DB_PASSWORD` (tu contraseña generada)

> **Nota:** Guarda estos datos, los necesitarás en el paso siguiente.

---

## Paso 2: Subir los cambios a GitHub

Antes de desplegar, asegúrate de que todo el código esté actualizado en el repositorio:
```bash
git add .
git commit -m "Configura despliegue en Vercel"
git push origin main
```

---

## Paso 3: Desplegar el Backend en Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta (puedes usar **"Sign up with GitHub"**).
2. Haz clic en **"Add New..."** → **"Project"**.
3. Importa tu repositorio de GitHub: `ElGermanDBg/proyecto-eventos-ticketing`.
4. **Configura el proyecto:**
   - **Root Directory:** `backend`
   - **Framework Preset:** `Other`
5. **Agrega las variables de entorno** (en la sección "Environment Variables"):
   - `DB_NAME` = `neondb`
   - `DB_USER` = `neondb_owner`
   - `DB_PASSWORD` = `npg_xu5aXvkOA6QK`
   - `DB_HOST` = `ep-old-silence-at13jlbh.c-9.us-east-1.aws.neon.tech`
   - `JWT_SECRET` = `mi_clave_super_secreta`
   - `FRONTEND_URL` = *(se llenará después del paso 4)*
6. Haz clic en **"Deploy"**.
7. Vercel te dará una URL pública del backend (ejemplo: `https://eventos-backend.vercel.app`). **Copia esta URL.**

---

## Paso 4: Desplegar el Frontend en Vercel

1. En el Dashboard de Vercel, haz clic en **"Add New..."** → **"Project"**.
2. Importa el **mismo repositorio** de GitHub: `ElGermanDBg/proyecto-eventos-ticketing`.
3. **Configura el proyecto:**
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Vite` (Vercel lo detecta automáticamente)
4. **Agrega la variable de entorno:**
   - `VITE_API_URL` = `https://tu-backend.vercel.app/api` *(usa la URL del paso 3)*
5. Haz clic en **"Deploy"**.
6. Vercel te dará una URL pública del frontend (ejemplo: `https://eventos-frontend.vercel.app`).

---

## Paso 5: Actualizar FRONTEND_URL en el Backend

1. Ve al proyecto del **backend** en Vercel → **Settings** → **Environment Variables**.
2. Actualiza la variable `FRONTEND_URL` con la URL del frontend del paso 4:
   - `FRONTEND_URL` = `https://eventos-frontend.vercel.app`
3. Ve a **Deployments** y haz clic en **"Redeploy"** para que tome el cambio.

---

## Paso 6: ¡Listo!

La URL del frontend (ejemplo: `https://eventos-frontend.vercel.app`) es la que debes entregar como **"Enlace de aplicación desplegada"**.

### Verificar que todo funciona:
- Abre la URL del frontend y verifica que carga.
- Regístrate como usuario nuevo.
- Inicia sesión.
- Visualiza los eventos.

---

> **Nota:** En el plan gratuito de Vercel, las funciones serverless tienen un límite de 10 segundos de ejecución y un cold start de ~1-3 segundos en la primera petición. Esto es normal.
