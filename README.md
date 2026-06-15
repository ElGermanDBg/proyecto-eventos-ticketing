# Sistema de Gestión de Eventos con Ticketing

Este es el Proyecto Final Integrador del curso. Consiste en una plataforma completa para la gestión de eventos, permitiendo a los usuarios registrarse, visualizar eventos, y comprar tickets con reserva temporal.

El sistema está construido con una arquitectura Cliente-Servidor (React + Node.js/Express) y utiliza PostgreSQL como base de datos.

## 🚀 Tecnologías Utilizadas

**Backend:**
- Node.js & Express
- PostgreSQL & Sequelize (ORM)
- JWT (JSON Web Tokens) para Autenticación
- express-rate-limit & Helmet para Seguridad y prevención de ataques
- express-validator para validación de datos

**Frontend:**
- React (Vite)
- CSS nativo / Framework (según configuración)

---

## 🛠️ Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_CARPETA>
```

### 2. Configuración de Base de Datos
1. Asegúrate de tener **PostgreSQL** instalado y ejecutándose.
2. Crea una base de datos llamada `eventos_db` (puedes usar pgAdmin o psql).

### 3. Configuración del Backend
```bash
cd backend
npm install
```
Crea un archivo `.env` en la carpeta `backend` con las siguientes variables:
```env
PORT=5000
DB_NAME=eventos_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña_de_postgres
DB_HOST=localhost
JWT_SECRET=tu_clave_super_secreta_para_jwt
```
Inicia el servidor backend:
```bash
npm start
# o npm run dev (si usas nodemon)
```

### 4. Configuración del Frontend
Abre otra terminal y ejecuta:
```bash
cd frontend
npm install
npm run dev
```
La aplicación web estará disponible en `http://localhost:5173` (o el puerto que asigne Vite).

---

## 📡 Endpoints Principales (API RESTful)

### Autenticación (`/api/auth`)
- `POST /register`: Registra un nuevo usuario (encripta el password con bcrypt).
- `POST /login`: Inicia sesión y devuelve un token JWT (limitado a 5 intentos cada 15 min).

### Eventos (`/api/eventos`)
- `GET /`: Obtiene la lista de todos los eventos disponibles.
- `GET /:id`: Obtiene el detalle de un evento.
- *(Rutas protegidas con JWT para administradores: POST, PUT, DELETE)*

### Tickets (`/api/tickets`)
- `POST /comprar`: Realiza la compra de un ticket para un evento específico (requiere JWT).
- `GET /mis-tickets`: Devuelve los tickets comprados por el usuario autenticado.

---

## 🛡️ Seguridad Implementada (OWASP)
Este proyecto integra múltiples capas de seguridad:
1. **Helmet.js**: Configura cabeceras HTTP seguras para proteger la app de vulnerabilidades web conocidas (XSS, Clickjacking).
2. **Rate Limiting**: Previene ataques de denegación de servicio (DDoS) y ataques de fuerza bruta. Limitado a 100 peticiones generales y 5 peticiones específicas para la ruta de login.
3. **Validación de Datos**: Uso de `express-validator` para sanear y validar el input del usuario antes de que llegue a la base de datos.
4. **Protección de Contraseñas**: Hasheo con `bcryptjs` en la base de datos. Ninguna contraseña se guarda en texto plano.
5. **Autenticación sin estado**: Uso de JSON Web Tokens (JWT) para evitar almacenar sesiones en el servidor.
