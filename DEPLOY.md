# Guía de Despliegue en Render.com

## ¿Qué es Render?
[Render.com](https://render.com) es una plataforma en la nube gratuita que puede hospedar tu Base de Datos PostgreSQL, tu Backend (Node.js) y tu Frontend (React) al mismo tiempo.

---

## Pasos para Desplegar

### 1. Sube los últimos cambios a GitHub
Antes de hacer el deploy, asegúrate de que todo el código esté en tu repositorio. Ejecuta en la terminal:
```bash
git add .
git commit -m "Agrega configuración de deploy y dashboard"
git push origin main
```

### 2. Crea una cuenta en Render
Ve a [render.com](https://render.com) y crea una cuenta (puedes usar "Sign up with GitHub" para mayor facilidad).

### 3. Despliega con Blueprint (render.yaml)
1. En el Dashboard de Render, haz clic en **New +** → **Blueprint**.
2. Conecta tu repositorio de GitHub: `ElGermanDBg/proyecto-eventos-ticketing`.
3. Render detectará automáticamente el archivo `render.yaml` y creará los 3 servicios:
   - ✅ Base de datos PostgreSQL (`eventos-db`)
   - ✅ Backend Node.js (`eventos-backend`)
   - ✅ Frontend React (`eventos-frontend`)
4. Haz clic en **Apply**.

### 4. Configura la variable de entorno del Frontend
Una vez desplegado el backend, Render te dará una URL pública para el backend (algo como `https://eventos-backend.onrender.com`).

Ve a tu servicio `eventos-frontend` en Render → **Environment** → **Add Environment Variable**:
- **Key:** `VITE_API_URL`
- **Value:** `https://eventos-backend.onrender.com/api`

Haz clic en **Save Changes** y el frontend se redesplegará automáticamente.

### 5. ¡Listo!
Render te dará una URL pública para tu frontend del tipo `https://eventos-frontend.onrender.com`. 
¡Esa es la URL que debes entregar como **"Enlace de aplicación desplegada"**!

---

> **Nota:** En el plan gratuito de Render, los servicios web se "duermen" después de 15 minutos de inactividad. La primera petición puede tardar unos 30-60 segundos mientras el servidor "despierta". Esto es normal.
