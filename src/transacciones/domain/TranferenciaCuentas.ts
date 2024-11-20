import { TipoTransaccion } from "../../domain/Enums";

export class TransferenciasCuentas {
    transaccion_id?: number;
    cuenta_origen_id: number;
    cuenta_destino_id: number;
    usuario_id: number;
    usuario_destino_id: number;
    monto: number;
    tipo_transaccion: TipoTransaccion;
    contrasenia: string

    constructor(infoTranferenciasCuentas: {
        transaccion_id?: number;
        cuenta_origen_id: number;
        cuenta_destino_id: number;
        usuario_id: number;
        usuario_destino_id: number;
        monto: number;
        tipo_transaccion: TipoTransaccion;
        contrasenia: string;
    }) {
        this.transaccion_id = infoTranferenciasCuentas.transaccion_id;
        this.cuenta_origen_id = infoTranferenciasCuentas.cuenta_origen_id;
        this.cuenta_destino_id = infoTranferenciasCuentas.cuenta_destino_id;
        this.usuario_id = infoTranferenciasCuentas.usuario_id
        this.usuario_destino_id = infoTranferenciasCuentas.usuario_destino_id
        this.monto = infoTranferenciasCuentas.monto;
        this.tipo_transaccion = infoTranferenciasCuentas.tipo_transaccion;
        this.contrasenia = infoTranferenciasCuentas.contrasenia;
    }
}