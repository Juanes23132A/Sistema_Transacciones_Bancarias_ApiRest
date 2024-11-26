import Express from "express";
import { UsuarioControllers } from "../../../application/UsuariosController";

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

    return router;
}