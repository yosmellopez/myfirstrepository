CREATE TABLE rol
(
  id_rol INTEGER NOT NULL IDENTITY,
  rol VARCHAR(255)
);

CREATE TABLE usuario
(
  apellidos VARCHAR(255),
  contrasena VARCHAR(255),
  nombre VARCHAR(255),
  usuario VARCHAR(255),
  id_usuario INTEGER NOT NULL IDENTITY,
  id_rol INTEGER
);

INSERT INTO rol VALUES (1, 'Administrador');
INSERT INTO rol VALUES (2, 'Usuario');