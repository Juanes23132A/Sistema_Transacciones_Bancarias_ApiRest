import Express from "express";
import { CuentasControllers } from "../../../application/CuentasController";

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

    router.post("/cuentas/bloquear", (req, res) => {
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

    router.post("/cuentas/activar", (req, res) => {
        const payload = req.body;
        cuentaCtrl
            .activarCuenta(payload)
            .then((result) => {
                const status = result.ok === true ? 200 : 400;
                res.status(status).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    router.get("/cuentas", (req, res) => {
        const payload = req.body;
        cuentaCtrl
            .obtener(payload)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    router.get("/cuentasTransferencias", (req, res) => {
        const payload = req.body;
        cuentaCtrl
            .obtenerTransacciones(payload)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
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