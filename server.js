import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gamerRoutes from "./gamer/gamer.routes.js";
import gameRoutes from "./game/game.routes.js";
import playRoutes from "./play/play.routes.js";
import swaggerDocs from "./config/swagger.js";

dotenv.config();

//Initialize Express App
const app = express(); 
app.use(express.json()); //Parses incoming JSON requests.
app.use(cors()); //Allows requests from different origins (e.g., frontend apps).

//Setup API Routes
app.use("/gamers", gamerRoutes);
app.use("/games", gameRoutes);
app.use("/play", playRoutes);

//Enable Swagger API Documentation
swaggerDocs(app);

//Start Server (Only in Non-Test Mode)
if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}


export default app;