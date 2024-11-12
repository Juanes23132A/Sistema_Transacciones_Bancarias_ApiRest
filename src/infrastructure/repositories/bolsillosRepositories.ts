import { FieldPacket, ResultSetHeader } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { Bolsillo } from "../../domain/Bolsillos/Bolsillos";

export class BolsillosRepositorie {

    async crearBolsillo(bolsillo: Bolsillo) {
        const connection = getPoolConection();
        const querySql = `INSERT INTO bolsillos (usuario_id, nombre, saldo) VALUES (?, ?, ?)`;
        const values = [bolsillo.usuario_id, bolsillo.nombre, bolsillo.saldo];  
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async obtenerBolsillos(){
        const connection = getPoolConection();
        const querySql = `SELECT * FROM bolsillos`;
        const result = await connection.query(querySql);
        return result[0];
    }

    async eliminarBolsillo(nombre: string) {
        const connection = getPoolConection();
        const querySql = `DELETE FROM cuentas_usuario WHERE nombre = ?`;
        const values = [nombre];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
}