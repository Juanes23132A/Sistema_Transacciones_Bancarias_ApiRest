import Express from "express";
import { UsuarioControllers } from "../../../application/usuariosController";

export const usuarioRoutes = () => {
    const router = Express.Router();

    const usuarioCtrl = new UsuarioControllers();

    router.post("/usuarios", (req, res) => {
        const payload = req.body;
        usuarioCtrl
            .agregar(payload)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    router.delete("/usuarios/:id", async (req, res) => {
        try {
            const dni = req.params.id;
            if (Number.isNaN(dni)) {
                res.status(400).send({ ok: false, mensaje: "Error en el dni enviado" });
                return;
            }
            const result = await usuarioCtrl.eliminar(dni);
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    return router;
}