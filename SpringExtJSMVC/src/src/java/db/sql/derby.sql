CREATE TABLE rol
(
  id_rol INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),
  rol VARCHAR(255),
  CONSTRAINT rol_primary_key PRIMARY KEY (id_rol)
);

CREATE TABLE usuario
(
  id_usuario INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),
  apellidos VARCHAR(255),
  contrasena VARCHAR(255),
  nombre VARCHAR(255),
  usuario VARCHAR(255),
  id_rol INTEGER,
  CONSTRAINT usuario_primary_key PRIMARY KEY (id_usuario)
);

INSERT INTO rol VALUES (1, 'Administrador');
INSERT INTO rol VALUES (2, 'Usuario');
