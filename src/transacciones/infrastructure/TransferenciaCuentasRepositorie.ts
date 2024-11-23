import { FieldPacket, ResultSetHeader  } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { TransferenciasCuentas } from "../domain/TranferenciaCuentas";
import { TipoTransaccion } from "../../domain/Enums";

export class transferenciasRepositorie {
    async Transferir(transferencias: TransferenciasCuentas) {
        const connection = getPoolConection();
        const querySql1 = `INSERT INTO transacciones (usuario_id, cuenta_origen_id, usuario_destino_id, cuenta_destino_id, monto, tipo_transaccion) VALUES  (?, ?, ?, ?, ?, ?)`;
        const querySql2 = `UPDATE cuentas_usuario SET saldo = saldo - ? WHERE cuenta_id = ? AND usuario_id = ? AND contrasenia = ? AND estado_cuenta = activa`;
        const querySql3 = `UPDATE cuentas_usuario SET saldo = saldo + ? WHERE cuenta_id = ? AND usuario_id = ?`;
        const values1 = [transferencias.usuario_id, transferencias.cuenta_origen_id, transferencias.usuario_destino_id, transferencias.cuenta_destino_id, transferencias.monto, TipoTransaccion.TRANSFERENCIA, transferencias.contrasenia]
        const values2 = [transferencias.monto, transferencias.cuenta_origen_id, transferencias.usuario_id, transferencias.contrasenia]
        const values3 = [transferencias.monto, transferencias.cuenta_destino_id, transferencias.usuario_destino_id]
        const result1: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql1, values1);
        const result2: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql2, values2);
        const result3: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql3, values3);
        return result1[0], result2[0], result3[0];
    }
}