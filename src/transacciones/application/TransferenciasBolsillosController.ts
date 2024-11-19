import { TransferenciaBolsillos } from "../domain/TranferenciasBolsillos";
import { transferenciaBolsillosRepositorie } from "../infrastructure/TransferenciaBolsillosRepositories";

export class TransferenciasBolsillosController {
    private repositories: transferenciaBolsillosRepositorie;

    constructor() {
        this.repositories = new transferenciaBolsillosRepositorie();
    }

    async transferir(payload: {
        cuenta_origen_id: number;
        bolsillo_destino_id: number;
        monto: number;
    }) {
        try {
            const transferencia = new TransferenciaBolsillos({
                cuenta_origen_id: payload.cuenta_origen_id,
                bolsillo_destino_id: payload.bolsillo_destino_id,
                monto: payload.monto
            });
            const result = await this.repositories.transferirBolsillo(transferencia);
            if (result.affectedRows == 1) {
                return { ok: true };
            } else {
                return { ok: false, mensaje: "Error al crear la cuenta" };
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al crear la cuenta", error?.mensaje);
            throw error;
        }
    }
}