import { EstadoCuenta } from "../Enums";

export class Usuario {
    dni: number;
    nombre: string;
    email: string;
    telefono: string;
    fecha_creacion_usuario?: Date;
    contrasenia: string;

    constructor(infoUsuario: {
        dni: number;
        nombre: string;
        email: string;
        telefono: string;
        fecha_creacion_usuario?: Date;
        contrasenia: string;
    }) {
        this.dni = infoUsuario.dni;
        this.nombre = infoUsuario.nombre;
        this.email = infoUsuario.email;
        this.telefono = infoUsuario.telefono;
        this.fecha_creacion_usuario = infoUsuario.fecha_creacion_usuario;
        this.contrasenia = infoUsuario.contrasenia;
    }
}