import { FieldPacket, ResultSetHeader } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { CuentaUsuario } from "../../domain/Cuentas/CuentasUsuario";
import { EstadoCuenta } from "../../domain/Enums";

export class CuentasRepositorie {

    async crearCuenta(cuenta: CuentaUsuario) {
        const connection = getPoolConection();
        const querySql = `INSERT INTO cuentas_usuario (usuario_id, tipo_cuenta, estado_cuenta, contrasenia) VALUES (?, ?, ?, ?)`;
        const values = [cuenta.usuario_id, cuenta.tipo_cuenta, EstadoCuenta.ACTIVA, cuenta.contrasenia];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async obtenerCuenta() {
        const connection = getPoolConection();
        const querySql = `SELECT * FROM cuentas_usuario`;
        const result = await connection.query(querySql);
        return result[0];
    }

    async bloquearCuenta(cuenta_id: CuentaUsuario) {
        const connection = getPoolConection();
        const querySql = `UPDATE cuentas_usuario SET estado_cuenta = inactiva WHERE usuario_id = ?`;
        const values = [cuenta_id.cuenta_id]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async eliminarCuentaBancaria(id: string) {
        const connection = getPoolConection();
        const querySql = `DELETE FROM cuentas_usuario WHERE cuenta_id = ?`;
        const values = [id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
}