import { Usuario } from "../domain/Usuarios/Usuario";
import { UsuariosRepositorie } from "../infrastructure/repositories/usuariosRepositories";
import { BcryptService } from "../services/bcrypt";

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
            const password = payload.contrasenia;
            const hash = await BcryptService.hashPassword(password)
            usuario.contrasenia = hash
            const result = await this.repositories.crearUsuario(usuario);
            if (result.affectedRows == 1) {
                return { ok: true, id: result.insertId };
            } else {
                return { ok: false, mensaje: "Error al crear usuario" };
            }
        }
        catch (error: any) {
            console.log("Ha ocurrido un error al crear el usuario", error?.mensaje);
            throw error;
        }
    }
}