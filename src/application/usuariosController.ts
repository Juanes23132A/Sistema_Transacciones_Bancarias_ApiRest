import { ResultSetHeader } from "mysql2";
import { Usuario } from "../domain/Usuarios/Usuario";
import { UsuariosRepositorie } from "../infrastructure/repositories/usuariosRepositorie";

export class UsuarioControllers {
    private repositories: UsuariosRepositorie;

    constructor() {
        this.repositories = new UsuariosRepositorie();
    }

    async agregar(payload: {
        dni: number;
        nombre: string;
        email: string;
        telefono: string;
        contrasenia: string
    }) {
        try {
            const usuario = new Usuario({
                dni: payload.dni,
                nombre: payload.nombre,
                email: payload.email,
                telefono: payload.telefono,
                contrasenia: payload.contrasenia
            });
            const result = await this.repositories.crearUsuario(usuario);
            if (result.affectedRows == 1) {
                return { ok: true, id: result.insertId };
            } else {
                return { ok: false, mensaje: "Error al crear usuario" };
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al crear el usuario", error?.mensaje);
            throw error;
        }
    }

    async eliminar(dni: string) {
        const result: ResultSetHeader = await this.repositories.eliminarUsuario(dni)
        if (result.affectedRows == 1) {
            return { ok: true, mensaje: "Usuario eliminado correctamente" }
        } else {
            return { ok: false, mensaje: "No se pudo eliminar el usuario" }
        }
    }
}