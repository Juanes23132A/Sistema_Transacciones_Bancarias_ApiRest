import Express from "express";
import { depositosController } from "../../../transacciones/application/TansferenciasDepositosController";

export const depositosRoutes = () => {
    const router = Express.Router();

    const depositoCtrl = new depositosController();

    router.post("/depositar", (req, res) => {
        const payload = req.body;
        depositoCtrl
        .depositar(payload)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.status(500).send(error);

        });
    });

    return router;
}