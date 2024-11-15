import Express from "express";
import { bolsillosRoutes } from "./bolsillosRouter";
import { usuarioRoutes } from "./usuariosRouter";
import { cuentasRoutes } from "./cuantasRouter";

export const routes = () => {
    const router = Express.Router();
    router.get("/", (req, res) => {

    });
    router.use(usuarioRoutes());
    router.use(cuentasRoutes());
    router.use(bolsillosRoutes());

    return router;
}