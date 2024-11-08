-- DDL : LENGUAJE DE DEFINICIÓN DE DATOS
-- Es el código que permite crear las tablas en la base de datos
-- Este código se ejecuta en un script en la base de datos (dbeaver - workbench)
-- para crear las tablas

-- Base de Datos Sistema Bancario

CREATE DATABASE `sistemabancario`;

-- sistemabancario.usuario definition

CREATE TABLE `usuario` (
  `dni` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `fecha_creacion_usuario` datetime NOT NULL,
  `estado_cuenta` enum('activa','inactiva') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contrasenia` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`dni`)
);


-- sistemabancario.bolsillos definition

CREATE TABLE `bolsillos` (
  `bolsillo_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `saldo` decimal(10,0) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`bolsillo_id`),
  KEY `bolsillos_usuario_FK` (`usuario_id`),
  CONSTRAINT `bolsillos_usuario_FK` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`dni`)
);


-- sistemabancario.cuentas_usuario definition

CREATE TABLE `cuentas_usuario` (
  `cuenta_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `tipo_cuenta` enum('ahorro','corriente') NOT NULL,
  `saldo` decimal(10,0) NOT NULL,
  `fecha_apertura` datetime NOT NULL,
  `estado_cuenta` enum('activa','inactiva') NOT NULL,
  PRIMARY KEY (`cuenta_id`),
  KEY `Cuentas_usuario_FK` (`usuario_id`),
  CONSTRAINT `Cuentas_usuario_FK` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`dni`)
);


-- sistemabancario.sesiones definition

CREATE TABLE `sesiones` (
  `sesion_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `fecha_ingreso` datetime NOT NULL,
  `fecha_expiracion` datetime NOT NULL,
  PRIMARY KEY (`sesion_id`),
  KEY `sesiones_usuario_FK` (`usuario_id`),
  CONSTRAINT `sesiones_usuario_FK` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`dni`)
);


-- sistemabancario.transacciones definition

CREATE TABLE `transacciones` (
  `transaccion_id` int NOT NULL AUTO_INCREMENT,
  `cuenta_origen_id` int NOT NULL,
  `cuenta_destino_id` int NOT NULL,
  `monto` decimal(10,0) NOT NULL,
  `tipo_transaccion` enum('transferencia','deposito') NOT NULL,
  `fecha_transaccion` datetime NOT NULL,
  `estado_transaccion` enum('completada','fallida') NOT NULL,
  PRIMARY KEY (`transaccion_id`),
  KEY `transacciones_cuentas_FK` (`cuenta_origen_id`),
  KEY `transacciones_cuentas_FK_1` (`cuenta_destino_id`),
  CONSTRAINT `transacciones_cuentas_FK` FOREIGN KEY (`cuenta_origen_id`) REFERENCES `cuentas_usuario` (`cuenta_id`),
  CONSTRAINT `transacciones_cuentas_FK_1` FOREIGN KEY (`cuenta_destino_id`) REFERENCES `cuentas_usuario` (`cuenta_id`)
);


-- sistemabancario.transferencias_bolsillos definition

CREATE TABLE `transferencias_bolsillos` (
  `transferencia_bolsillo_id` int NOT NULL AUTO_INCREMENT,
  `cuenta_origen_id` int NOT NULL,
  `bolsillo_destino_id` int NOT NULL,
  `monto` decimal(10,0) NOT NULL,
  `fecha_transferencia` datetime NOT NULL,
  PRIMARY KEY (`transferencia_bolsillo_id`),
  KEY `transferencias_bolsillos_bolsillos_FK_1` (`bolsillo_destino_id`),
  KEY `transferencias_bolsillos_cuentas_usuario_FK` (`cuenta_origen_id`),
  CONSTRAINT `transferencias_bolsillos_bolsillos_FK_1` FOREIGN KEY (`bolsillo_destino_id`) REFERENCES `bolsillos` (`bolsillo_id`),
  CONSTRAINT `transferencias_bolsillos_cuentas_usuario_FK` FOREIGN KEY (`cuenta_origen_id`) REFERENCES `cuentas_usuario` (`cuenta_id`)
);


-- sistemabancario.cuentas_banco definition

CREATE TABLE `cuentas_banco` (
  `usuario_id` int NOT NULL,
  `numero_cuenta` int NOT NULL,
  KEY `cuentas_banco_usuario_FK` (`usuario_id`),
  KEY `cuentas_banco_cuentas_usuario_FK` (`numero_cuenta`),
  CONSTRAINT `cuentas_banco_cuentas_usuario_FK` FOREIGN KEY (`numero_cuenta`) REFERENCES `cuentas_usuario` (`cuenta_id`),
  CONSTRAINT `cuentas_banco_usuario_FK` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`dni`)
);