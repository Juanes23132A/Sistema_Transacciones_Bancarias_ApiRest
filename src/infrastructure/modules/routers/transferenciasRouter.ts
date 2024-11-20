import Express from "express";
import { TransferenciasController } from "../../../transacciones/application/TransferenciaCuentasController";

export const transferenciaRoutes = () => {
    const router = Express.Router();

    const transfereciaCtrl = new TransferenciasController();

    router.post("/transferir", (req, res) => {
        const payload = req.body;
        transfereciaCtrl
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