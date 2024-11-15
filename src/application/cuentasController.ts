import { ResultSetHeader } from "mysql2";
import { CuentaUsuario } from "../domain/Cuentas/CuentasUsuario";
import { CuentasRepositorie } from "../infrastructure/repositories/cuentasRepositories";
import { EstadoCuenta, TipoCuenta } from "../domain/Enums";

export class CuentasControllers {
    private repositories: CuentasRepositorie;

    constructor() {
        this.repositories = new CuentasRepositorie();
    }

    async agregar(payload: {
        usuario_id: number;
        tipo_cuenta: TipoCuenta;
        estado_cuenta: EstadoCuenta
        contrasenia: string;
    }) {
        try {
            const cuenta = new CuentaUsuario({
                usuario_id: payload.usuario_id,
                tipo_cuenta: payload.tipo_cuenta,
                estado_cuenta: payload.estado_cuenta,
                contrasenia: payload.contrasenia
            });
            const result = await this.repositories.crearCuenta(cuenta);
            if (result.affectedRows == 1) {
                return { ok: true, id: result.insertId };
            } else {
                return { ok: false, mensaje: "Error al crear la cuenta" };
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al crear la cuenta", error?.mensaje);
            throw error;
        }
    }

    async obtener() {
        try {
            const result = await this.repositories.obtenerCuenta();
            return result;
        } catch (error) {
            return error;
        }
    }

    async bloquearCuenta(payload: {
        cuenta_id?: number;
        usuario_id: number;
        tipo_cuenta: TipoCuenta;
        saldo?: number;
        fecha_apertura?: Date;
        estado_cuenta: EstadoCuenta;
        contrasenia: string;
    }) {
        try {
            const cuenta = new CuentaUsuario({
                usuario_id: payload.usuario_id,
                tipo_cuenta: payload.tipo_cuenta,
                estado_cuenta: payload.estado_cuenta,
                contrasenia: payload.contrasenia
            });
            const result = await this.repositories.bloquearCuenta(cuenta);
            if (result.affectedRows == 1) {
                return { ok: true, id: result.insertId };
            } else {
                return { ok: false, mensaje: "Error al bloquear la cuenta" };
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al bloquear la cuenta", error?.mensaje);
            throw error;
        }
    }

    async eliminar(id: string) {
        const result: ResultSetHeader = await this.repositories.eliminarCuentaBancaria(id)
        if (result.affectedRows == 1) {
            return { ok: true, message: "Cuenta eliminada correctamente" };
        } else {
            return { ok: false, message: "No se pudo eliminar la Cuenta" };
        }
    }
}