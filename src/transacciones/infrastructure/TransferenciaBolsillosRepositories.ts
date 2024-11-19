import { FieldPacket, ResultSetHeader  } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { TransferenciaBolsillos } from "../domain/TranferenciasBolsillos";

export class transferenciaBolsillosRepositorie {
    async transferirBolsillo(transferencia: TransferenciaBolsillos) {
        const connection = getPoolConection();
        const querySql1 = `INSERT INTO transferencias_bolsillos (transferencia_bolsillo_id, cuenta_origen_id, bolsillo_destino_id, monto) VALUES (?, ?, ?, ?)`;
        const querySql2 = `UPDATE cuentas_usuario SET saldo = saldo - ? WHERE cuenta_id = ?;`;
        const querySql3 = `UPDATE bolsillos SET saldo = saldo + ? WHERE bolsillo_id = ?;`;
        const values1 = [transferencia.transferencia_bolsillos_id, transferencia.cuenta_origen_id, transferencia.bolsillo_destino_id, transferencia.monto]
        const values2 = [transferencia.monto, transferencia.cuenta_origen_id]
        const values3 = [transferencia.monto, transferencia.bolsillo_destino_id]
        const result1: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql1, values1);
        const result2: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql2, values2);
        const result3: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql3, values3);
        return result1[0], result2[0], result3[0];
    }
}