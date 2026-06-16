# Informe de Seguridad

**Proyecto Final — Sistema de Gestión de Eventos con Ticketing**

## 1. Helmet.js
Se utiliza `helmet` como middleware global en `app.js` para configurar headers HTTP seguros:
- **X-Content-Type-Options: nosniff** — Evita que el navegador interprete archivos con un MIME-Type diferente al declarado.
- **X-Frame-Options** — Previene ataques de Clickjacking al bloquear la carga del sitio en iframes externos.
- **Protección XSS** — Deshabilita la ejecución de scripts no confiables.

## 2. Rate Limiting
Se implementa `express-rate-limit` para limitar las peticiones por IP:
- **Global:** Máximo 100 peticiones cada 15 minutos en todas las rutas `/api/`.
- **Login:** Máximo 5 intentos cada 15 minutos en `/api/auth/login` para prevenir ataques de fuerza bruta.

## 3. CORS
La API restringe los orígenes permitidos según el entorno:
- En desarrollo, acepta peticiones desde `localhost`.
- En producción, solo acepta peticiones desde el dominio del frontend configurado en `FRONTEND_URL`.
- Se limitan los métodos HTTP a GET, POST, PUT, DELETE y los headers a Content-Type y Authorization.

## 4. Validación de Datos
- El ORM Sequelize parametriza las consultas automáticamente, previniendo inyección SQL.
- Se utiliza `express-validator` en las rutas de registro para validar formato de email, longitud de contraseña y campos obligatorios antes de procesarlos.

## 5. Protección de Contraseñas
Las contraseñas se almacenan hasheadas en la base de datos PostgreSQL usando `bcryptjs` con un factor de salt de 10 rondas. En ningún momento se guarda la contraseña en texto plano. Durante el login, se compara el hash criptográficamente.

## 6. Autenticación JWT
El sistema usa JSON Web Tokens para gestionar sesiones sin estado:
- Al iniciar sesión, el backend genera un token firmado con `JWT_SECRET` que expira en 24 horas.
- El middleware `verifyToken` valida el token en cada petición protegida.
- El middleware `isAdmin` verifica el rol del usuario para restringir el acceso al Dashboard Administrativo.

## Conclusión
Estas medidas cubren las principales vulnerabilidades del Top 10 de OWASP: inyecciones, fallas en autenticación, exposición de datos sensibles, control de acceso inadecuado y configuración insegura.
