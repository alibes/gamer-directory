import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gamer Directory API",
      version: "1.0.0",
      description: "API documentation for Gamer Directory",
    },
    servers: [
      {
        url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: [
    "./gamer/gamer.routes.js", /**js Doc Comments */
    "./game/game.routes.js",
    "./play/play.routes.js"
  ],
};

const swaggerSpec = swaggerJSDoc(options); // to json

const swaggerDocs = (app) => {  // it use to serve swagger UI mount swagger UI at api-docs
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  console.log(`Swagger docs available at ${process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`}/api-docs`);
};

export default swaggerDocs;
