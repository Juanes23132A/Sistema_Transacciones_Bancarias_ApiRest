import Express from "express";
import { bolsillosRoutes } from "./bolsillosRouter";
import { usuarioRoutes } from "./usuariosRouter";
import { cuentasRoutes } from "./cuantasRouter";
import { bolsillosTransferenciaRoutes } from "./transaccionesRouter";

export const routes = () => {
    const router = Express.Router();
    router.get("/", (req, res) => {

    });
    router.use(usuarioRoutes());
    router.use(cuentasRoutes());
    router.use(bolsillosRoutes());
    router.use(bolsillosTransferenciaRoutes());


    return router;
}