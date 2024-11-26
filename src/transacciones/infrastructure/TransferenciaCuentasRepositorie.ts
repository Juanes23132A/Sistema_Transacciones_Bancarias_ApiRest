import { FieldPacket, ResultSetHeader  } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { TransferenciasCuentas } from "../domain/TranferenciaCuentas";
import { TipoTransaccion } from "../../domain/Enums";

export class transferenciasRepositorie {
    async Transferir(transferencias: TransferenciasCuentas) {
        const connection = getPoolConection();
        const querySql1 = `INSERT INTO transacciones (usuario_id, cuenta_origen_id, usuario_destino_id, cuenta_destino_id, monto, tipo_transaccion) VALUES  (?, ?, ?, ?, ?, ?);`;
        const querySql2 = `UPDATE cuentas_usuario SET saldo = saldo - ? WHERE cuenta_id = ? AND usuario_id = ?;`;
        const querySql3 = `UPDATE cuentas_usuario SET saldo = saldo + ? WHERE cuenta_id = ? AND usuario_id = ?;`;
        const values1 = [transferencias.usuario_id, transferencias.cuenta_origen_id, transferencias.usuario_destino_id, transferencias.cuenta_destino_id, transferencias.monto, TipoTransaccion.TRANSFERENCIA];
        const values2 = [transferencias.monto, transferencias.cuenta_origen_id, transferencias.usuario_id];
        const values3 = [transferencias.monto, transferencias.cuenta_destino_id, transferencias.usuario_destino_id];
        const result1: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql1, values1);
        const result2: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql2, values2);
        const result3: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql3, values3);
        return result1[0], result2[0], result3[0];
    }

    async obtenerEstadoCuenta(usuario_id: number, cuenta_id: number){
        const connection = getPoolConection();
        const querySql = `SELECT estado_cuenta FROM cuentas_usuario WHERE usuario_id = ? AND cuenta_id = ?;`;
        const values = [usuario_id, cuenta_id];
        const result = await connection.query(querySql, values);
        const resultString = JSON.stringify(result)
        const parsedData = JSON.parse(resultString);
        const estado_cuenta = parsedData[0][0].estado_cuenta;
        return estado_cuenta
    }

    async obtenerContrasenia(usuario_id: number, cuenta_id: number){
        const connection = getPoolConection();
        const querySql = `SELECT contrasenia FROM cuentas_usuario WHERE usuario_id = ? AND cuenta_id = ?;`;
        const values = [usuario_id, cuenta_id];
        const result = await connection.query(querySql, values);
        const resultString = JSON.stringify(result)
        const parsedData = JSON.parse(resultString);
        const contrasenia = parsedData[0][0].contrasenia;
        return contrasenia
    }

    async obtenerSaldo(usuario_id: number, cuenta_id: number){
        const connection = getPoolConection();
        const querySql = `SELECT saldo FROM cuentas_usuario WHERE usuario_id = ? AND cuenta_id = ?;`;
        const values = [usuario_id, cuenta_id];
        const result = await connection.query(querySql, values);
        const resultNumber = JSON.stringify(result)
        const parsedData = JSON.parse(resultNumber);
        const saldo = Number(parsedData[0][0].saldo);
        return saldo
    }
}