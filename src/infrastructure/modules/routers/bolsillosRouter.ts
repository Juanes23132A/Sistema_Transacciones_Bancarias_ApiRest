import Express from "express";
import { BolsillosControllers } from "../../../application/BolsillosController";

export const bolsillosRoutes = () => {
    const router = Express.Router();

    const bolsilloCtrl = new BolsillosControllers();

    /**
   * @swagger
   * /bolsillos:
   *   post:
   *     summary: Crea un nuevo bolsillo
   *     tags:
   *       - Bolsillos
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties: 
   *               usuario_id:
   *                  type: number
   *               nombre:
   *                  type: string
   *
   *     responses:
   *       200:
   *         description: Bolsillo creado
   *       400:
   *         description: Error en la creación del bolsillo
   *       500:
   *         description: Error de servidor  
   */
    router.post("/bolsillos", (req, res) => {
        const payload = req.body;
        bolsilloCtrl
            .agregar(payload)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    /**
   * @swagger
   * /bolsillos:
   *   get:
   *     summary: Obtiene todos los bolsillos
   *     tags:
   *       - Bolsillos
   *     responses:
   *       200:
   *         description: Lista de bolsillos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   bolsillo_id:
   *                     type: number
   *                   usuario_id:
   *                     type: number
   *                   nombre:
   *                     type: string
   *                   saldo:
   *                     type: number
   */
    router.get("/bolsillos", async (_, res) => {
        try {
            const result = await bolsilloCtrl.obtener();
            res.send(result);
        } catch (error) {
            res.send({
                message: "Ha ocurrido un error al consultar el bolsillo",
            });
        }
    });
    
    return router;
}