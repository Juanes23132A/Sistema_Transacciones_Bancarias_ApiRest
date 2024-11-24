import Express from "express";
import { bolsillosRoutes } from "./BolsillosRouter";
import { usuarioRoutes } from "./UsuariosRouter";
import { cuentasRoutes } from "./CuantasRouter";
import { bolsillosTransferenciaRoutes } from "./TransaccionesBolsillosRouter";
import { depositosRoutes } from "./DepositosRouter";
import { transferenciaRoutes } from "./TransferenciasRouter";

export const routes = () => {
    const router = Express.Router();
    router.get("/", (req, res) => {

    });
    router.use(usuarioRoutes());
    router.use(cuentasRoutes());
    router.use(bolsillosRoutes());
    router.use(bolsillosTransferenciaRoutes());
    router.use(depositosRoutes());
    router.use(transferenciaRoutes());

    return router;
}