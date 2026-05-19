# Prueba Técnica - Sistema de Inventario

Este proyecto es una prueba técnica que consiste en un sistema de gestión de inventario con un backend en Spring Boot y un frontend en Angular.

## Detalles del Entorno

*   **IDE utilizado**:  IntelliJ IDEA.
*   **Lenguaje de programación**:
    *   **Backend**: Java 17 (Spring Boot)
    *   **Frontend**: TypeScript (Angular)
*   **DBMS utilizado**: MySQL (Base de datos: `castores_inventario`)

## Pasos para correr la aplicación

### Requisitos previos

1.  Tener instalado **Java 17**.
2.  Tener instalado **Node.js** (versión recomendada 18+).
3.  Tener instalado **MySQL** y ejecutándose.
4.  Crear la base de datos `castores_inventario` en MySQL.
5.  Configurar el usuario y contraseña de MySQL en `Castores_prueba/src/main/resources/application.properties` (actualmente configurado con usuario: `root` y contraseña: `kafka`).

### Correr el Backend

1.  Abre una terminal en la carpeta `Castores_prueba`.
2.  Ejecuta el siguiente comando para iniciar el servidor de Spring Boot:
    ```bash
    .\mvnw.cmd spring-boot:run
    ```
    *(En Linux/Mac usa `./mvnw spring-boot:run`)*
3.  El backend estará corriendo en `http://localhost:8080`.

### Correr el Frontend

1.  Abre otra terminal en la carpeta `inventory-frontend`.
2.  Instala las dependencias (solo la primera vez):
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo de Angular:
    ```bash
    npm start
    ```
4.  El frontend estará disponible en `http://localhost:4200`.

## Poblado de datos (SQL)

### Roles y Usuarios
```sql
-- Insertar Roles
INSERT INTO rol(nombre)
VALUES
('ADMINISTRADOR'),
('ALMACENISTA');

-- Insertar Usuarios de Prueba
INSERT INTO usuario(nombre, correo, contrasena, estatus, idRol)
VALUES
('ADMIN', 'admin@gmail.com', '1234', true, 1),
('Juan', 'juan@gmail.com', '12345', true, 2);
```

## Credenciales de prueba

*   **Administrador**: `admin@gmail.com` / `1234`
*   **Almacén**: `juan@gmail.com` / `12345`
