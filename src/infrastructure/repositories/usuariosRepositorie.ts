import { FieldPacket, ResultSetHeader } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { Usuario } from "../../domain/Usuarios/Usuario";

export class UsuariosRepositorie {

    async crearUsuario(usuarios: Usuario) {
        const connection = getPoolConection();
        const querySql = `INSERT INTO usuario (dni, nombre, email, telefono, contrasenia) VALUES (?, ?, ?, ?, ?)`;
        const values = [usuarios.dni, usuarios.nombre, usuarios.email, usuarios.telefono, usuarios.contrasenia];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values)
        return result[0];
    }

    async eliminarUsuario(dni: string) {
        const connection = getPoolConection();
        const querySql = `DELETE FROM usuario WHERE dni = ?`;
        const values = [dni];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
}