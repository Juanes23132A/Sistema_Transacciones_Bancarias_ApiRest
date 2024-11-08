import { EstadoTransaccion, TipoTransaccion } from "../Enums";

export class Transacciones {
    transaccion_id?: number;
    cuenta_origen_id: number;
    cuenta_destino_id: number;
    monto: number;
    tipo_transaccion: TipoTransaccion;
    fecha_transaccion: Date;
    estado_transaccion: EstadoTransaccion;

    constructor(infoTransacciones:{
        transaccion_id?: number;
        cuenta_origen_id: number;
        cuenta_destino_id: number;
        monto: number;
        tipo_transaccion: TipoTransaccion;
        fecha_transaccion: Date;
        estado_transaccion: EstadoTransaccion;
    }) {
        this.transaccion_id =  infoTransacciones.transaccion_id;
        this.cuenta_origen_id =  infoTransacciones.cuenta_origen_id;
        this.cuenta_destino_id  =  infoTransacciones.cuenta_destino_id;
        this.monto =  infoTransacciones.monto;
        this.tipo_transaccion =  infoTransacciones.tipo_transaccion;
        this.fecha_transaccion = infoTransacciones.fecha_transaccion;
        this.estado_transaccion = infoTransacciones.estado_transaccion;
    }
}