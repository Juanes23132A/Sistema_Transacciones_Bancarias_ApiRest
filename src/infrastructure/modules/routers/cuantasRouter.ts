import Express from "express";
import { CuentasControllers } from "../../../application/cuentasController";

export const cuentasRoutes = () => {
    const router = Express.Router();

    const cuentaCtrl = new CuentasControllers();

    router.post("/cuentas", (req, res) => {
        const payload = req.body;
        cuentaCtrl
            .agregar(payload)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    router.post("/cuentas", (req, res) => {
        const payload = req.body;
        cuentaCtrl
            .bloquearCuenta(payload)
            .then((result) => {
                const status = result.ok === true ? 200 : 400;
                res.status(status).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    router.get("/cuentas", async (_, res) => {
        try {
            const result = await cuentaCtrl.obtener();
            res.send(result);
        } catch (error) {
            res.send({
                message: "Ha ocurrido un error al consultar las cuentas",
            });
        }
    });

    router.delete("/cuentas/:id", async (req, res) => {
        try {
            const id = req.params.id;
            if (Number.isNaN(id)) {
                res.status(400).send({ ok: false, message: "Error en el id enviado" });
                return;
            }
            const result = await cuentaCtrl.eliminar(id);
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    
    return router;
}