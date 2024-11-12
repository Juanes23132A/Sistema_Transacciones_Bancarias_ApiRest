import { FieldPacket, ResultSetHeader } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { CuentasUsuario } from "../../domain/Cuentas/CuentasUsuario";

export class CuentasRepositorie {

    async crearCuenta(cuenta: CuentasUsuario){
        const connection = getPoolConection();
        const querySql = `INSERT INTO cuentas_usuario (usuario_id, tipo_cuenta, estado_cuenta, contrasenia) VALUES (?, ?, ?, ?)`;
        const values = [cuenta.usuario_id, cuenta.tipo_cuenta, cuenta.estado_cuenta,cuenta.contrasenia];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async obtenerCuenta(){
        const connection = getPoolConection();
        const querySql = `SELECT * FROM cuentas_usuario`;
        const result = await connection.query(querySql);
        return result[0];
    }

    async eliminarCuentaBancaria(dni: string) {
        const connection = getPoolConection();
        const querySql = `DELETE FROM cuentas_usuario WHERE usuario_id = ?`;
        const values = [dni];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
}