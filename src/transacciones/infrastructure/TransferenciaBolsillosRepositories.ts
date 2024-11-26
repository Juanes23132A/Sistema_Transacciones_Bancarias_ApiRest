import { FieldPacket, ResultSetHeader  } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { TransferenciaBolsillos } from "../domain/TranferenciasBolsillos";

export class transferenciaBolsillosRepositorie {
    async transferirBolsillo(transferencia: TransferenciaBolsillos) {
        const connection = getPoolConection();
        const querySql1 = `INSERT INTO transferencias_bolsillos (cuenta_origen_id, bolsillo_destino_id, monto) VALUES (?, ?, ?)`;
        const querySql2 = `UPDATE cuentas_usuario SET saldo = saldo - ? WHERE cuenta_id = ?;`;
        const querySql3 = `UPDATE bolsillos SET saldo = saldo + ? WHERE bolsillo_id = ?;`;
        const values1 = [transferencia.cuenta_origen_id, transferencia.bolsillo_destino_id, transferencia.monto]
        const values2 = [transferencia.monto, transferencia.cuenta_origen_id]
        const values3 = [transferencia.monto, transferencia.bolsillo_destino_id]
        const result1: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql1, values1);
        const result2: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql2, values2);
        const result3: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql3, values3);
        return result1[0], result2[0], result3[0];
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
}