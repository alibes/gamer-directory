import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gamerRoutes from "./gamer/gamer.routes.js";
import gameRoutes from "./game/game.routes.js";
import playRoutes from "./play/play.routes.js";
import swaggerDocs from "./config/swagger.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/gamers", gamerRoutes);
app.use("/games", gameRoutes);
app.use("/play", playRoutes);

swaggerDocs(app);

if (process.env.NODE_ENV !== "test") {
  const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 4000}`);
  });
}


export default app;