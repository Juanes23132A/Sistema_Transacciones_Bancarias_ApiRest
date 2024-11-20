import { TipoTransaccion } from "../../domain/Enums";

export class TransferenciasDepositos {
    transaccion_id?: number;
    cuenta_destino_id?: number;
    usuario_destino_id: number;
    monto: number;
    tipo_transaccion: TipoTransaccion;

    constructor(infoTranferenciasDepositos: {
        transaccion_id?: number;
        cuenta_destino_id?: number;
        usuario_destino_id: number;
        monto: number;
        tipo_transaccion: TipoTransaccion;
    }) {
        this.transaccion_id = infoTranferenciasDepositos.transaccion_id;
        this.cuenta_destino_id = infoTranferenciasDepositos.cuenta_destino_id;
        this.usuario_destino_id = infoTranferenciasDepositos.usuario_destino_id
        this.monto = infoTranferenciasDepositos.monto;
        this.tipo_transaccion = infoTranferenciasDepositos.tipo_transaccion;
    }
}