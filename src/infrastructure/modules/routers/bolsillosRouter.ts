import Express from "express";
import { BolsillosControllers } from "../../../application/bolsillosController";

export const bolsillosRoutes = () => {
    const router = Express.Router();

    const bolsilloCtrl = new BolsillosControllers();

    router.post("/vehiculos", (req, res) => {
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

    router.get("/vehiculos", async (_, res) => {
        try {
            const result = await bolsilloCtrl.obtener();
            res.send(result);
        } catch (error) {
            res.send({
                message: "Ha ocurrido un error al consultar los vehiculos",
            });
        }
    });

    router.delete("/vehiculos/:id", async (req, res) => {
        try {
            const id = req.params.id;
            if (Number.isNaN(id)) {
                res.status(400).send({ ok: false, message: "Error en el id enviado" });
                return;
            }
            const result = await bolsilloCtrl.eliminar(id);
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    
    return router;
}