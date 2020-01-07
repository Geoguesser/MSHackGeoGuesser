import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import { env } from "./enviornment";
import { setupAppSession, setupCors, setupSequelize } from "./config/setup-express";
import "./config/setup-passport";

export function initialize() {
  const app = express();

  setupAppSession(app);
  setupCors(app);
  setupSequelize(app);

  // disables cached 304. Not sure if best solution, but needed it for now
  app.disable("etag");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // setup routes
  app.use("/", authRoutes);
  app.use("/api", userRoutes);
  app.get("/api", (req, res) => {
    res.send({ express: "Hello from express" });
  });

  app.listen(env.serverPort, () => console.log("listening on port " + env.serverPort));
}
