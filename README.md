# API_notasTexto

Esta es una API para gestionar notas de texto privadas y categorizarlas.

## Instalación

1. Clona este repositorio: `git clone https://github.com/naimagargari/API_notasTexto.git`
2. Instala las dependencias: `npm install`

## Configuración de la Base de Datos

1. Configura tu base de datos MySQL.
2. Crea una base de datos llamada `API_notasTexto`.
3. Ejecuta el script SQL provisto en `db/schema.sql` para crear las tablas necesarias.

## Uso

1. Configura las variables de entorno en un archivo `.env`.

   - `DB_HOST`: Host de la base de datos MySQL.
   - `DB_USER`: Usuario de la base de datos MySQL.
   - `DB_PASSWORD`: Contraseña de la base de datos MySQL.
   - `DB_DATABASE`: Nombre de la base de datos (`app_notas_texto`).
   - `PORT`: Puerto en el que se ejecutará el servidor (por defecto: 3000).

2. Ejecuta el servidor: `npm start`.

## Rutas de la API

- `/api/notes`: Rutas para operaciones CRUD de notas.
- `/api/categories`: Rutas para operaciones CRUD de categorías.
- `/api/auth`: Rutas para autenticación de usuarios (registro, inicio de sesión).

## Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
