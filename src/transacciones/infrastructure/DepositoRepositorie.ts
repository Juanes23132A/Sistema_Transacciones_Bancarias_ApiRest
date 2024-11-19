import { FieldPacket, ResultSetHeader  } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { TransferenciasDepositos } from "../domain/deposito";
import { TipoTransaccion } from "../../domain/Enums";

export class transaccionesRepositorie {
    async Transacciones(transacciones: TransferenciasDepositos) {
        const connection = getPoolConection();
        const querySql1 = `INSERT INTO transacciones (usuario_id, cuenta_destino_id, monto, tipo_transaccion) VALUES  (?, ?, ?, ?)`;
        const querySql2 = `UPDATE cuentas_usuario SET saldo = saldo + ? WHERE cuenta_id = ? AND usuario_id = ?`;
        const values1 = [transacciones.usuario_id, transacciones.cuenta_destino_id, transacciones.monto, TipoTransaccion.DEPOSITO]
        const values2 = [transacciones.monto, transacciones.cuenta_destino_id, transacciones.usuario_id]
        const result1: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql1, values1);
        const result2: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql2, values2);
        return result1[0], result2[0];
    }
}