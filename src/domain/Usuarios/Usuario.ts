import { EstadoCuenta } from "../Enums";

export class Usuario {
    dni?: number;
    nombre: string;
    email: string;
    telefono: string;
    fecha_creacion_usuario: Date;
    estado_cuenta: EstadoCuenta;
    contraseña: string;

    constructor(infoUsuario: {
        dni?: number;
        nombre: string;
        email: string;
        telefono: string;
        fecha_creacion_usuario: Date;
        estado_cuenta: EstadoCuenta;
        contraseña: string;
    }) {
        this.dni = infoUsuario.dni;
        this.nombre = infoUsuario.nombre;
        this.email = infoUsuario.email;
        this.telefono = infoUsuario.telefono;
        this.fecha_creacion_usuario = infoUsuario.fecha_creacion_usuario;
        this.estado_cuenta = infoUsuario.estado_cuenta;
        this.contraseña = infoUsuario.contraseña;
    }
}