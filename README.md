# Sistema de Gestión de Eventos con Ticketing

Este es el Proyecto Final Integrador del curso. Consiste en una plataforma completa para la gestión de eventos, permitiendo a los usuarios registrarse, visualizar eventos, y comprar tickets con reserva temporal.

El sistema está construido con una arquitectura Cliente-Servidor (React + Node.js/Express) y utiliza PostgreSQL como base de datos.

**Repositorio:** [https://github.com/ElGermanDBg/proyecto-eventos-ticketing](https://github.com/ElGermanDBg/proyecto-eventos-ticketing)

**Aplicación Desplegada:** [https://eventos-frontend.vercel.app](https://eventos-frontend.vercel.app)

---

## 🚀 Tecnologías Utilizadas

**Backend:**
- Node.js & Express
- PostgreSQL & Sequelize (ORM)
- JWT (JSON Web Tokens) para Autenticación
- express-rate-limit & Helmet para Seguridad y prevención de ataques
- express-validator para validación de datos
- UUID para generación de códigos únicos de tickets

**Frontend:**
- React (Vite)
- CSS nativo / Framework (según configuración)

---

## 🏗️ Arquitectura del Proyecto (MVC)

```
proyecto/
├── backend/
│   ├── api/                  # Punto de entrada para Vercel Serverless
│   │   └── index.js
│   ├── src/
│   │   ├── config/          # Configuración de Base de Datos (Sequelize)
│   │   │   └── database.js
│   │   ├── controllers/     # Controladores (Lógica de Negocio)
│   │   │   ├── authController.js
│   │   │   ├── eventoController.js
│   │   │   └── ticketController.js
│   │   ├── middleware/       # Middlewares (Auth JWT, Rate Limiting)
│   │   │   ├── auth.js
│   │   │   └── rateLimit.js
│   │   ├── models/           # Modelos ORM (Sequelize)
│   │   │   ├── Usuario.js
│   │   │   ├── Evento.js
│   │   │   └── Ticket.js
│   │   ├── routes/           # Rutas (Definición de Endpoints)
│   │   │   ├── authRoutes.js
│   │   │   ├── eventoRoutes.js
│   │   │   └── ticketRoutes.js
│   │   └── app.js            # Punto de entrada del servidor
│   ├── tests/                # Pruebas unitarias (Jest + Supertest)
│   │   └── eventos.test.js
│   ├── package.json
│   └── vercel.json           # Configuración de despliegue Vercel (Backend)
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   │   ├── Login.jsx
│   │   │   ├── EventosList.jsx
│   │   │   ├── CompraTicket.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/         # Configuración de API (Axios)
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── render.yaml               # Configuración de despliegue alternativa (Render.com)
├── INFORME_SEGURIDAD.md      # Informe de seguridad implementada
├── DEPLOY.md                 # Guía de despliegue en Vercel
└── README.md                 # Este archivo
```

---

## 🛠️ Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### 1. Clonar el repositorio
```bash
git clone https://github.com/ElGermanDBg/proyecto-eventos-ticketing.git
cd proyecto-eventos-ticketing
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
FRONTEND_URL=http://localhost:5173
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

### 5. Ejecutar pruebas unitarias
```bash
cd backend
npm test
```

---

## 📡 Endpoints Principales (API RESTful)

### Autenticación (`/api/auth`)
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registra un nuevo usuario (encripta password con bcrypt) | No |
| POST | `/api/auth/login` | Inicia sesión y devuelve token JWT (limitado a 5 intentos/15min) | No |

### Eventos (`/api/eventos`)
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/eventos` | Lista todos los eventos disponibles | No |
| GET | `/api/eventos/:id` | Detalle de un evento específico | No |
| POST | `/api/eventos` | Crear un nuevo evento | JWT + Admin |
| PUT | `/api/eventos/:id` | Actualizar un evento existente | JWT + Admin |
| DELETE | `/api/eventos/:id` | Eliminar un evento | JWT + Admin |

### Tickets (`/api/tickets`)
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/tickets/comprar` | Comprar un ticket para un evento | JWT |
| GET | `/api/tickets/mis-tickets` | Ver tickets del usuario autenticado | JWT |

### Códigos de Estado HTTP Utilizados
- `200` — Operación exitosa
- `201` — Recurso creado exitosamente
- `400` — Error de validación / solicitud incorrecta
- `401` — Token inválido o expirado
- `403` — Sin autorización / sin token
- `404` — Recurso no encontrado
- `500` — Error interno del servidor

---

## 🛡️ Seguridad Implementada (OWASP)
Este proyecto integra múltiples capas de seguridad:
1. **Helmet.js**: Configura cabeceras HTTP seguras para proteger la app de vulnerabilidades web conocidas (XSS, Clickjacking).
2. **Rate Limiting**: Previene ataques de denegación de servicio (DDoS) y ataques de fuerza bruta. Limitado a 100 peticiones generales y 5 peticiones específicas para la ruta de login.
3. **CORS Restringido**: Configuración de orígenes permitidos específicos, evitando peticiones no autorizadas desde dominios externos.
4. **Validación de Datos**: Uso de `express-validator` para sanear y validar el input del usuario antes de que llegue a la base de datos.
5. **Protección de Contraseñas**: Hasheo con `bcryptjs` en la base de datos. Ninguna contraseña se guarda en texto plano.
6. **Autenticación sin estado**: Uso de JSON Web Tokens (JWT) para evitar almacenar sesiones en el servidor.

> Para más detalles, consulta el [Informe de Seguridad](INFORME_SEGURIDAD.md).

---

## 🚀 Despliegue
La aplicación está desplegada en **Vercel** como dos proyectos separados:
- ✅ **Frontend** — Static Site (Vite/React) en Vercel
- ✅ **Backend** — Serverless Functions (Express/Node.js) en Vercel
- ✅ **Base de datos** — PostgreSQL en Neon.tech (plan gratuito)

> Para instrucciones detalladas de despliegue, consulta la [Guía de Despliegue](DEPLOY.md).
