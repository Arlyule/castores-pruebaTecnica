-- =========================================
-- TABLA ROL
-- =========================================
CREATE TABLE rol (
    idRol INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

-- =========================================
-- TABLA USUARIO
-- =========================================
CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    idRol INT,
    nombre VARCHAR(50),
    correo VARCHAR(100),
    contrasena VARCHAR(50),
    estatus BOOLEAN,

    CONSTRAINT fk_usuario_rol
        FOREIGN KEY (idRol)
        REFERENCES rol(idRol)
);

-- =========================================
-- TABLA PRODUCTOS
-- =========================================
CREATE TABLE productos (
    idProductos INT PRIMARY KEY AUTO_INCREMENT,
    nombreProducto VARCHAR(50),
    descripcion VARCHAR(500),
    precio NUMERIC(10,2),
    estatus BOOLEAN
);

-- =========================================
-- TABLA INVENTARIO
-- =========================================
CREATE TABLE inventario (
    idInventario INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    idProducto INT,
    cantidad INT,
    fechaRegistro DATE,
    tipoMovimiento BOOLEAN,

    CONSTRAINT fk_inventario_usuario
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(idUsuario),

    CONSTRAINT fk_inventario_producto
        FOREIGN KEY (idProducto)
        REFERENCES productos(idProductos)
);