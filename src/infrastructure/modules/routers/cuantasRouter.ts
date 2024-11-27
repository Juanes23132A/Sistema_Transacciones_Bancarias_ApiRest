import Express from "express";
import { CuentasControllers } from "../../../application/CuentasController";

export const cuentasRoutes = () => {
    const router = Express.Router();

    const cuentaCtrl = new CuentasControllers();

    /**
   * @swagger
   * /cuentas:
   *   post:
   *     summary: Crea una nueva cuenta
   *     tags:
   *       - Cuentas
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties: 
   *               usuario_id:
   *                  type: number
   *               tipo_cuenta:
   *                  type: string
   *               contrasenia:
   *                  type: string
   *
   *     responses:
   *       200:
   *         description: Cuenta creada
   *       400:
   *         description: Error en la creación de la cuenta
   *       500:
   *         description: Error de servidor  
   */
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

    /**
    * @swagger
    * /cuentas/bloquear:
    *   post:
    *     summary: Bloquear una nueva cuenta
    *     tags:
    *       - Cuentas
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties: 
    *               cuenta_id:
    *                  type: number
    *               usuario_id:
    *                  type: number
    *
    *     responses:
    *       200:
    *         description: Cuenta bloqueada
    *       400:
    *         description: Error en el bloqueo de la cuenta
    *       500:
    *         description: Error de servidor  
    */
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

    /**
    * @swagger
    * /cuentas/activar:
    *   post:
    *     summary: Activar una nueva cuenta
    *     tags:
    *       - Cuentas
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties: 
    *               cuenta_id:
    *                  type: number
    *               usuario_id:
    *                  type: number
    *
    *     responses:
    *       200:
    *         description: Cuenta activada
    *       400:
    *         description: Error en la activacion de la cuenta
    *       500:
    *         description: Error de servidor  
    */
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

    /**
    * @swagger
    * /cuentas:
    *   get:
    *     summary: Obtiene todas las cuentas de un usuario
    *     tags:
    *       - Cuentas
    *     responses:
    *       200:
    *         description: Lista de Cuentas
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               items:
    *                 type: object
    *                 properties:
    *                   dni:
    *                     type: number
    */
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

    /**
* @swagger
* /cuentasTransferencias:
*   get:
*     summary: Obtiene todas las transacciones de un usuario de un usuario
*     tags:
*       - Cuentas
*     responses:
*       200:
*         description: Lista de Transacciones
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   dni:
*                     type: number
*/
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

    return router;
}