import { TipoTransaccion } from "../../domain/Enums";
import { TransferenciasCuentas } from "../domain/TranferenciaCuentas";
import { transferenciasRepositorie } from "../infrastructure/TransferenciaCuentasRepositorie";

export class TransferenciasController {
    private repositories: transferenciasRepositorie;
    
    constructor() {
        this.repositories = new transferenciasRepositorie();
    }

    async transferir(payload: {
        cuenta_origen_id: number;
        cuenta_destino_id: number;
        usuario_id: number;
        usuario_destino_id: number;
        monto: number;
        tipo_transaccion: TipoTransaccion;
        contrasenia: string;
    }) {
        try {
            const transferencia = new TransferenciasCuentas({
                cuenta_origen_id: payload.cuenta_origen_id,
                cuenta_destino_id: payload.cuenta_destino_id,
                usuario_id: payload.usuario_id,
                usuario_destino_id: payload.usuario_destino_id,
                monto: payload.monto,
                tipo_transaccion: payload.tipo_transaccion,
                contrasenia: payload.contrasenia
            });
            const result = await this.repositories.Transferir(transferencia)
            if (result.affectedRows == 1) {
                return { ok: true };
            } else {
                return { ok: false, mensaje: "Error al transferir" };
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al transferir", error?.mensaje);
            throw error;
        }
    }
}