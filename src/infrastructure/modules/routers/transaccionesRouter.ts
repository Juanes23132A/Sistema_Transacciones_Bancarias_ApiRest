import Express from "express";
import { TransferenciasBolsillosController } from "../../../transacciones/application/TransferenciasBolsillosController";

export const bolsillosTransferenciaRoutes = () => {
    const router = Express.Router();

    const transferenciaCtrl = new TransferenciasBolsillosController();

    router.post("/transferirBolsillos", (req, res) => {
        const payload = req.body;
        transferenciaCtrl
            .transferir(payload)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    return router;
}