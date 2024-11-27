import Express from "express";
import { TransferenciasBolsillosController } from "../../../transacciones/application/TransferenciasBolsillosController";

export const bolsillosTransferenciaRoutes = () => {
    const router = Express.Router();

    const transferenciaCtrl = new TransferenciasBolsillosController();

    /**
    * @swagger
    * /transferirBolsillos:
    *   post:
    *     summary: Transferir a un bolsillo
    *     tags:
    *       - Transferir a Bolsillos
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties: 
    *               usuario_id:
    *                  type: number
    *               cuenta_origen_id:
    *                  type: number
    *               bolsillo_destino_id:
    *                  type: number
    *               monto:
    *                  type: number
    *
    *     responses:
    *       200:
    *         description: Transferencia al bolsillo realizada
    *       400:
    *         description: Error al Transferir al bolsillo
    *       500:
    *         description: Error de servidor  
    */
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