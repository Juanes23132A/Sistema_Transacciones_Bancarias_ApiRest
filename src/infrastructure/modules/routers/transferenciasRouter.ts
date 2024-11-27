import Express from "express";
import { TransferenciasController } from "../../../transacciones/application/TransferenciaCuentasController";

export const transferenciaRoutes = () => {
    const router = Express.Router();

    const transfereciaCtrl = new TransferenciasController();

        /**
    * @swagger
    * /transferir:
    *   post:
    *     summary: Transferir a una cuenta
    *     tags:
    *       - Transferir a Cuenta
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
    *               usuario_destino_id:
    *                  type: number
    *               monto:
    *                  type: number
    *               contrasenia:
    *                  type: string
    *
    *     responses:
    *       200:
    *         description: Transferencia a la cuenta realizada
    *       400:
    *         description: Error al Transferir a la cuenta
    *       500:
    *         description: Error de servidor  
    */
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