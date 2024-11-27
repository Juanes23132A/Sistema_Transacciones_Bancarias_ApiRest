import Express from "express";
import { depositosController } from "../../../transacciones/application/DepositosController";

export const depositosRoutes = () => {
    const router = Express.Router();

    const depositoCtrl = new depositosController();

    /**
    * @swagger
    * /depositar:
    *   post:
    *     summary: Deposita a una cuenta
    *     tags:
    *       - Depositar
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties: 
    *               usuario_destino_id:
    *                  type: number
    *               cuenta_destino_id:
    *                  type: number
    *               monto:
    *                  type: number
    *
    *     responses:
    *       200:
    *         description: Deposito Realizado
    *       400:
    *         description: Error al Depositar
    *       500:
    *         description: Error de servidor  
    */
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