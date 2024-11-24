import { getPoolConection } from "../../config/data-source";
import { EstadoCuenta } from "../domain/Enums";

export const validarEstadoCuenta= async (cuenta:number) =>{
    const connection = getPoolConection();
    const query = `SELECT * FROM cuentas_usuario WHERE cuenta_id = ?  AND estado_cuenta = ?`;
    const values = [cuenta, EstadoCuenta.INACTIVA];
    const result = await connection.query(query, values);
    return result[0];
}