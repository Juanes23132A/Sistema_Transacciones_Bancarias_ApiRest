import { EstadoCuenta, TipoCuenta } from "../Enums";

export class CuentaUsuario {
    cuenta_id?: number;
    usuario_id: number;
    tipo_cuenta?: TipoCuenta;
    saldo?: number;
    fecha_apertura?: Date;
    estado_cuenta?: EstadoCuenta;
    contrasenia:  string;

    constructor (infoCuentaUsuario: {
        cuenta_id?:  number;
        usuario_id:  number;
        tipo_cuenta?: TipoCuenta;
        saldo?: number;
        fecha_apertura?: Date;
        estado_cuenta?: EstadoCuenta;
        contrasenia: string;
    }) {
        this.cuenta_id = infoCuentaUsuario.cuenta_id;
        this.usuario_id = infoCuentaUsuario.usuario_id;
        this.tipo_cuenta   = infoCuentaUsuario.tipo_cuenta;
        this.saldo =  infoCuentaUsuario.saldo;
        this.fecha_apertura =  infoCuentaUsuario.fecha_apertura;
        this.estado_cuenta =   infoCuentaUsuario.estado_cuenta;
        this.contrasenia = infoCuentaUsuario.contrasenia;
    }
}