import Express from "express";
import { BolsillosControllers } from "../../../application/bolsillosController";

export const bolsillosRoutes = () => {
    const router = Express.Router();

    const bolsilloCtrl = new BolsillosControllers();

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

    router.get("/bolsillos", async (_, res) => {
        try {
            const result = await bolsilloCtrl.obtener();
            res.send(result);
        } catch (error) {
            res.send({
                message: "Ha ocurrido un error al consultar los vehiculos",
            });
        }
    });

    router.delete("/bolsillos", async (req, res) => {
        const payload = req.body;
        try {
            const result = await bolsilloCtrl.eliminar(payload);
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    
    return router;
}