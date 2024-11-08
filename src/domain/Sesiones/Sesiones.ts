export class Sesiones {
    sesion_id?: number;
    usuario_id: number;
    fecha_ingreso: Date;
    fecha_expiracion: Date;

    constructor(infoSesiones: {
        sesion_id?: number;
        usuario_id: number;
        fecha_ingreso: Date;
        fecha_expiracion: Date;
    }) {
        this.sesion_id = infoSesiones.sesion_id;
        this.usuario_id  = infoSesiones.usuario_id;
        this.fecha_ingreso =  infoSesiones.fecha_ingreso;
        this.fecha_expiracion  = infoSesiones.fecha_expiracion;
    }
}