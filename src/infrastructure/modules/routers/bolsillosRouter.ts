import Express from "express";
import { BolsillosControllers } from "../../../application/BolsillosController";

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
                message: "Ha ocurrido un error al consultar el bolsillo",
            });
        }
    });
    
    return router;
}