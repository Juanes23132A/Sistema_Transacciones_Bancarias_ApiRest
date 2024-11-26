import { TransferenciaBolsillos } from "../domain/TranferenciasBolsillos";
import { transferenciaBolsillosRepositorie } from "../infrastructure/TransferenciaBolsillosRepositories";

export class TransferenciasBolsillosController {
    private repositories: transferenciaBolsillosRepositorie;

    constructor() {
        this.repositories = new transferenciaBolsillosRepositorie();
    }

    async transferir(payload: {
        usuario_id: number
        cuenta_origen_id: number;
        bolsillo_destino_id: number;
        monto: number;
    }) {
        try {
            const transferencia = new TransferenciaBolsillos({
                usuario_id: payload.usuario_id,
                cuenta_origen_id: payload.cuenta_origen_id,
                bolsillo_destino_id: payload.bolsillo_destino_id,
                monto: payload.monto
            });
            const validarSaldo = await this.repositories.obtenerSaldo(payload.usuario_id, payload.cuenta_origen_id);
            const validarEstadoCuentaOrigen = await this.repositories.obtenerEstadoCuenta(payload.usuario_id, payload.cuenta_origen_id);
            if (validarEstadoCuentaOrigen == "activa") {
                if (validarSaldo >= 0 && validarSaldo >= payload.monto) {
                    const result = await this.repositories.transferirBolsillo(transferencia)
                    if (result.affectedRows == 1) {
                        return { ok: true };
                    } else {
                        return { ok: false, mensaje: "Error al transferir al bolsillo" };
                    }
                } else {
                    return { ok: false, mensaje: "Error saldo insuficiente" }
                }
            } else {
                return { ok: false, mensaje: "Cuenta incactiva" }
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al transferir al bolsillo", error?.mensaje);
            throw error;
        }
    }
}