import { queryObjects } from "node:v8";
import { TipoTransaccion } from "../../domain/Enums";
import { hashPassword, verifyPassword } from "../../services/bcrypt";
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
            const obtenerContrasenia = await this.repositories.obtenerContrasenia(payload.usuario_id, payload.cuenta_origen_id);
            const validarhash = await verifyPassword(payload.contrasenia, obtenerContrasenia);
            const validarSaldo = await this.repositories.obtenerSaldo(payload.usuario_id, payload.cuenta_origen_id);
            const validarEstadoCuentaOrigen = await this.repositories.obtenerEstadoCuenta(payload.usuario_id, payload.cuenta_origen_id);
            const validarEstadoCuentaDestino = await this.repositories.obtenerEstadoCuenta(payload.usuario_destino_id, payload.cuenta_destino_id);
            if (validarEstadoCuentaOrigen == "activa" && validarEstadoCuentaDestino == "activa"){
                if (validarhash == false) {
                    return { ok: false, mensaje: "Contraseña incorrecta" }
                } else {
                    if (validarSaldo >= 0 && validarSaldo >= payload.monto) {
                        const result = await this.repositories.Transferir(transferencia)
                        if (result.affectedRows == 1) {
                            return { ok: true };
                        } else {
                            return { ok: false, mensaje: "Error al transferir" };
                        }
                    }else{
                        return { ok: false, mensaje: "Error saldo insuficiente"}
                    }
                }
            }else{
                return { ok: false, mensaje: "Cuenta incactiva"}
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al transferir", error?.mensaje);
            throw error;
        }
    }
}