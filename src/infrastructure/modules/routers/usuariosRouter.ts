import Express from "express";
import { UsuarioControllers } from "../../../application/UsuariosController";

export const usuarioRoutes = () => {
    const router = Express.Router();

    const usuarioCtrl = new UsuarioControllers();

     /**
   * @swagger
   * /usuarios:
   *   post:
   *     summary: Crea un nuevo usuario
   *     tags:
   *       - Usuarios
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties: 
   *               dni:
   *                  type: number
   *               nombre:
   *                  type: string
   *               email:
   *                  type: string
   *               telefono:
   *                  type: string
   *               contrasenia:
   *                  type: string
   *
   *     responses:
   *       200:
   *         description: Usuario creado
   *       400:
   *         description: Error en la creación del usuario
   *       500:
   *         description: Error de servidor  
   */
    router.post("/usuarios", (req, res) => {
        const payload = req.body;
        usuarioCtrl
            .agregar(payload)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    return router;
}