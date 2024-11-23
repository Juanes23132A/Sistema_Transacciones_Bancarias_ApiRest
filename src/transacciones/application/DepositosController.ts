import { TipoTransaccion } from "../../domain/Enums";
import { TransferenciasDepositos } from "../domain/Deposito";
import { transaccionesRepositorie } from "../infrastructure/DepositoRepositorie";

export class depositosController {
    private repositories: transaccionesRepositorie;
    
    constructor() {
        this.repositories = new transaccionesRepositorie();
    }

    async depositar(payload: {
        usuario_destino_id: number
        cuenta_destino_id: number;
        monto: number;
        tipo_transaccion: TipoTransaccion;
    }) {
        try {
            const deposito = new TransferenciasDepositos({
                usuario_destino_id: payload.usuario_destino_id,
                cuenta_destino_id: payload.cuenta_destino_id,
                monto: payload.monto,
                tipo_transaccion: payload.tipo_transaccion
            });
            const result = await this.repositories.Transacciones(deposito)
            if (result.affectedRows == 1) {
                return { ok: true };
            } else {
                return { ok: false, mensaje: "Error al depositar" };
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al depositar", error?.mensaje);
            throw error;
        }
    }
}