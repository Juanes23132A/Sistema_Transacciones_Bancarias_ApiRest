import Express from "express";
import { routes } from "./src/infrastructure/modules/routers/indexRouter";
import middleware404 from "./src/infrastructure/modules/middleware/middleware";

const crearServer = () => {
    const app = Express();

    app.use(Express.json());

    app.use(routes());
    app.get("/api", (req, res) => {
        res.send({ mensaje: "Bienvenido a la Api"});
    });
    
    app.use("/api/v1", routes());
    app.use(middleware404);
    
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
  })
}
crearServer()