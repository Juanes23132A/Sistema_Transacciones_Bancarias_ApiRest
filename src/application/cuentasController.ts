import { CuentaUsuario } from "../domain/Cuentas/CuentasUsuario";
import { CuentasRepositorie } from "../infrastructure/repositories/cuentasRepositories";
import { EstadoCuenta, TipoCuenta } from "../domain/Enums";
import { BcryptService } from "../services/bcrypt";

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
            const password = payload.contrasenia;
            const hash = await BcryptService.hashPassword(password)
            cuenta.contrasenia = hash
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

    async obtener(payload: {
        dni: string;
    }) {
        try {
            const dni = payload.dni;
            const result = await this.repositories.obtener(dni);
            return result;
        } catch (error) {
            return error;
        }
    }

    async obtenerTransacciones(payload: {
        dni: string;
    }) {
        try {
            const dni = payload.dni;
            const result = await this.repositories.obtenerTransacciones(dni);
            return result;
        } catch (error) {
            return error;
        }
    }

    async bloquearCuenta(payload: {
        usuario_id: number;
        cuenta_id: number;
    }) {
        try {
            const cuenta = ({
                usuario_id: payload.usuario_id,
                cuenta_id: payload.cuenta_id
            });
            const result = await this.repositories.bloquearCuenta(cuenta.usuario_id, cuenta.cuenta_id);
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

    async activarCuenta(payload: {
        cuenta_id: number;
        usuario_id: number;
    }) {
        try {
            const cuenta = {
                cuenta_id: payload.cuenta_id,
                usuario_id: payload.usuario_id
            };
            const result = await this.repositories.activarCuenta(cuenta);
            if (result.affectedRows == 1) {
                return { ok: true, id: result.insertId };
            } else {
                return { ok: false, mensaje: "Error al activar la cuenta" };
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al activar la cuenta", error?.mensaje);
            throw error;
        }
    }
}