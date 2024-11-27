import swaggerJsDoc from "swagger-jsdoc";
import path from "path"
 
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Sistema de Transacciones Bancarias ",
      version: "1.0.0",
      description: "Documentación de la API Sistema de Transacciones Bancarias",
       
     
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1" // Cambia esta URL según tu entorno
      }
    ]
  },
 
  apis: ["./src/infrastructure/modules/routers/*.ts"], // Incluye todos los archivos TypeScript de esa carpeta
};
 
const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;