# Sistema de Gestión de Eventos con Ticketing

Plataforma web para la gestión de eventos y venta de tickets. Permite a los usuarios registrarse, ver eventos disponibles y comprar entradas. Los administradores pueden crear, editar y eliminar eventos desde un dashboard.

**Repositorio:** https://github.com/ElGermanDBg/proyecto-eventos-ticketing

**Aplicación:** https://proyecto-eventos-ticketing-u1cc.vercel.app

---

## Tecnologías

**Backend:** Node.js, Express, PostgreSQL, Sequelize, JWT, Helmet, express-rate-limit, express-validator, UUID

**Frontend:** React, Vite, Axios, React Router

**Despliegue:** Vercel (frontend + backend serverless), Neon.tech (PostgreSQL)

---

## Estructura del Proyecto

```
├── backend/
│   ├── api/
│   │   └── index.js             # Entry point Vercel
│   ├── src/
│   │   ├── config/database.js   # Conexión PostgreSQL
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── eventoController.js
│   │   │   └── ticketController.js
│   │   ├── middleware/
│   │   │   ├── auth.js          # JWT y roles
│   │   │   └── rateLimit.js
│   │   ├── models/
│   │   │   ├── Usuario.js
│   │   │   ├── Evento.js
│   │   │   └── Ticket.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── eventoRoutes.js
│   │   │   └── ticketRoutes.js
│   │   └── app.js
│   ├── tests/
│   │   └── eventos.test.js
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── EventosList.jsx
│   │   │   ├── CompraTicket.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── INFORME_SEGURIDAD.md
├── DEPLOY.md
└── README.md
```

---

## Instalación Local

### Base de datos
Tener PostgreSQL instalado y crear una base de datos.

### Backend
```bash
cd backend
npm install
```

Crear archivo `.env`:
```
PORT=5000
DB_NAME=eventos_db
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
JWT_SECRET=clave_secreta
FRONTEND_URL=http://localhost:5173
```

```bash
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Tests
```bash
cd backend
npm test
```

---

## API RESTful

### Autenticación
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | /api/auth/register | Registro de usuario | No |
| POST | /api/auth/login | Login (devuelve JWT) | No |

### Eventos
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | /api/eventos | Listar eventos | No |
| GET | /api/eventos/:id | Detalle de evento | No |
| POST | /api/eventos | Crear evento | JWT + Admin |
| PUT | /api/eventos/:id | Editar evento | JWT + Admin |
| DELETE | /api/eventos/:id | Eliminar evento | JWT + Admin |

### Tickets
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | /api/tickets/comprar | Comprar ticket | JWT |
| GET | /api/tickets/mis-tickets | Mis tickets | JWT |

### Códigos de estado
- `200` OK — `201` Creado — `400` Validación — `401` Token inválido — `403` Sin autorización — `404` No encontrado — `500` Error del servidor

---

## Seguridad

- **Helmet** — Headers HTTP seguros (XSS, Clickjacking)
- **Rate Limiting** — 100 req/15min global, 5 intentos login/15min
- **CORS** — Orígenes restringidos por entorno
- **Bcrypt** — Hash de contraseñas con 10 rondas de salt
- **JWT** — Tokens con expiración de 24h
- **Validación** — express-validator en registro y login
- **Sequelize** — Prevención de SQL injection por parametrización

Ver detalle en [INFORME_SEGURIDAD.md](INFORME_SEGURIDAD.md)

---

## Despliegue

Desplegado en **Vercel** como dos proyectos (frontend estático + backend serverless) con base de datos en **Neon.tech**.

Ver instrucciones en [DEPLOY.md](DEPLOY.md)
