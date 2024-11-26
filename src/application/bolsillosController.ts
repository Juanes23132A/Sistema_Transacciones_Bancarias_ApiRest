import { Bolsillo } from "../domain/Bolsillos/Bolsillos";
import { BolsillosRepositorie } from "../infrastructure/repositories/bolsillosRepositories";

export class BolsillosControllers {
    private repositories: BolsillosRepositorie;

    constructor() {
        this.repositories = new BolsillosRepositorie();
    }

    async agregar(payload: {
        usuario_id: number;
        nombre: string;
    }) {
        try {
            const bolsillo = new Bolsillo({
                usuario_id: payload.usuario_id,
                nombre: payload.nombre
            });
            const result = await this.repositories.crearBolsillo(bolsillo);
            if (result.affectedRows == 1) {
                return { ok: true, id: result.insertId };
            } else {
                return { ok: false, mensaje: "Error al agregar bolsillo" };
            }
        }
        catch (error: any) {
            console.log("Ha ocurrido un error al crear el bolsillo", error.mensaje);
            throw error;
        }
    }

    async obtener() {
        try {
            const result = await this.repositories.obtenerBolsillos();
            return result;
        } catch (error) {
            return error;
        }
    }
}