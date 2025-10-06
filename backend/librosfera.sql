CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contraseña VARCHAR(255)
);

CREATE TABLE categorias_libros (
    id_categoría INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE,
    query_api VARCHAR(100)
);

CREATE TABLE libros (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    autor VARCHAR(100),
    descripcion TEXT,
    precio DECIMAL(10,2),
    existencias INT,
    imagen_url VARCHAR(255),
    id_categoría INT,
    FOREIGN KEY (id_categoría ) REFERENCES categorias_libros(id_categoría)
);

CREATE TABLE carritos (
    id_carrito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE carrito_items (
    id_carrito_items INT AUTO_INCREMENT PRIMARY KEY,
    id_carrito INT,
    id_libro INT,
    cantidad INT,
    FOREIGN KEY (id_carrito) REFERENCES carritos(id_carrito),
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro)
);

CREATE TABLE compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE detalle_compras (
    id_detalle_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_compra INT,
    id_libro INT,
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra),
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro)
);

INSERT INTO categorias_libros (nombre, query_api) VALUES
('Clásicos', 'classic'),
('Ciencia ficción', 'science fiction'),
('Horror', 'horror'),
('Fantasía', 'fantasy'),
('Juvenil', 'young adult'),
('Libros para niños', 'children'),
('Ofertas', 'horror'),
('Más vendidos', 'classic');