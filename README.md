# C25257 – API REST de Productos (Proyecto Final NodeJS – TalentoTech)

Este repositorio contiene mi implementación del proyecto final del curso de Backend con NodeJS, por TalentoTech.
El objetivo es aprender los fundamentos de las APIs REST implementando un ABM de productos con ExpressJS.

Adicionalmente, pudimos experimentar con recursos como middlewares, manejo de errores, destructuring y spread en JavaScript, la integración con un servicio de base de datos en la nube (Firebase), y CORS.

La aplicación expone endpoints para autenticar un único usuario y contraseña, y gestionar productos protegidos por JWT.

## Requisitos previos
- Node.js
- npm
- Una cuenta/proyecto en Firebase

## Configuración
1) Clonar el repositorio y entrar al directorio del proyecto.
2) Instalar dependencias:
```
npm install
```
3) Copiar el archivo `.env.template` a `.env` y completa los valores requeridos:

- `JWT_SECRET`: clave usada para firmar y validar tokens JWT. Si falta, la app no arranca.

Variables de Firebase:
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

Todas las variables de Firebase deben completarse para que la app funcione.

Opcional:
- `PORT`: puerto para la API. Por defecto `3000`.
- `CORS_ORIGIN`: origen permitido para CORS. Por defecto `http://localhost:3001`.

## Ejecución

Modo desarrollo (reinicio en caliente con `node --watch`):
```
npm run dev
```

Modo producción:
```
npm start
```

El puerto por defecto para la API es `3000`.

Endpoint raíz para ver estado rápido:
```
GET /
=> "We're up!"
```

## Autenticación
La autenticación utiliza JWT.
El endpoint de login provee un token con un tiempo de expiración de 30 minutos, que debe enviarse en cada request en la cabecera `Authorization` como `Bearer <token>` para acceder a los endpoints de productos.

- `POST /auth/login`
  - Body JSON:
    ```json
    {
      "user": "user",
      "password": "unGranPassword1"
    }
    ```
  - Respuesta exitosa:
    ```json
    {
      "user": "user",
      "token": "<JWT>"
    }
    ```

> El usuario es de demostración y está hardcodeado en `authRoutes.js`, junto a un simpático "TODO".

## ABM de Productos (protegido por JWT)
Todos los endpoints bajo `/products` requieren un encabezado `Authorization: Bearer <token>` válido.

- `GET /products`
  - Lista todos los productos.

- `GET /products/:id`
  - Obtiene un producto por su `id`.

- `POST /products`
  - Crea un producto nuevo. No se debe enviar `id` en el body.
  - Body JSON de ejemplo:
    ```json
    {
      "name": "Teclado Mecánico",
      "price": 120.5
    }
    ```

- `PUT /products/:id`
  - Actualiza un producto existente (merge de campos, se comporta como `PATCH`, esto es deliberado).
  - Body JSON de ejemplo:
    ```json
    {
      "price": 110
    }
    ```

- `DELETE /products/:id`
  - Elimina un producto. Responde `204 No Content` si se elimina correctamente.

## Ejemplos con curl
1) Login para obtener token:
```
curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"user":"user","password":"unGranPassword1"}'
```

2) Listar productos con token:
```
curl -s http://localhost:3000/products \
  -H "Authorization: Bearer <TOKEN>"
```

3) Crear un producto:
```
curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"name":"Teclado","price":99.9}'
```

## Integración con Firebase
En `firebase.js` se inicializa Firebase utilizando variables de entorno. Si la configuración está incompleta se arroja una excepción, impidiendo que la aplicación se inicie.
La capa de acceso a datos está implementada como repositorio, así que podría re-implementarse más adelante.
