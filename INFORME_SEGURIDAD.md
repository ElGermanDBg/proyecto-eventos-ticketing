# Informe de Seguridad Implementada

**Proyecto Final Integrador - Sistema de Gestión de Eventos con Ticketing**

El presente documento resume las capas de seguridad y protección contra vulnerabilidades comunes (OWASP) que han sido integradas en el backend de la aplicación.

## 1. Helmet.js (Protección de Cabeceras HTTP)
Se ha implementado `helmet` en el archivo principal `app.js` como middleware global. Esto configura automáticamente cabeceras HTTP seguras para mitigar vulnerabilidades comunes como:
- **XSS (Cross-Site Scripting):** Deshabilita la ejecución de scripts no confiables.
- **Clickjacking:** Configura `X-Frame-Options` para evitar que la página sea incrustada en iframes maliciosos.
- **Sniffing de MIME-Type:** Configura `X-Content-Type-Options: nosniff`.

## 2. Rate Limiting (Prevención de DDoS y Fuerza Bruta)
El proyecto utiliza `express-rate-limit` para limitar la cantidad de peticiones que un usuario puede hacer a la API en un determinado margen de tiempo:
- **Límite Global:** Se permite un máximo de 100 peticiones cada 15 minutos por IP a las rutas generales de `/api/`.
- **Límite Específico para Login:** Para proteger contra ataques de fuerza bruta en contraseñas, la ruta de `/api/auth/login` restringe a solo 5 intentos fallidos cada 15 minutos por IP.

## 3. Validación y Saneamiento de Datos
Para prevenir **Inyección SQL** e **Inyección NoSQL**, los datos recibidos de los usuarios son procesados cuidadosamente:
- El uso del ORM `Sequelize` previene la inyección SQL de forma nativa al parametrizar las consultas a la base de datos automáticamente.
- Se implementó `express-validator` en las rutas de registro y login para asegurarse de que los campos, como el email, tengan el formato correcto y estén limpios antes de procesarlos.

## 4. Protección de Credenciales (Bcrypt)
Ninguna contraseña es almacenada en texto plano en la base de datos PostgreSQL.
- Se emplea la biblioteca `bcryptjs` con un factor de "salting" de 10 rondas para hashear la contraseña del usuario durante su registro.
- En el inicio de sesión, el hash es comparado criptográficamente.

## 5. Autenticación y Autorización sin Estado (JWT)
El sistema utiliza JSON Web Tokens (JWT) para gestionar sesiones seguras:
- Después de un inicio de sesión exitoso, el backend emite un token firmado digitalmente con una clave secreta (`JWT_SECRET`).
- Este token caduca automáticamente (por ejemplo, en 24h), reduciendo la ventana de oportunidad si un atacante lo intercepta.
- Middleware personalizado (`verifyToken`, `isAdmin`) verifica en cada petición protegida que el token sea válido y no haya sido alterado, además de validar el rol del usuario para restringir el acceso al Dashboard Administrativo.

## Conclusión
La combinación de estas 5 herramientas cubre las vulnerabilidades más críticas (Top 10 de OWASP) como inyecciones, fallas en control de acceso, y problemas en la autenticación, creando un entorno seguro tanto para el cliente como para la integridad de los datos de la base de datos.
