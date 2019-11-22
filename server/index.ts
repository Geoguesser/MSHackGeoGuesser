import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import { sequelize } from "./config/setup-database";
import { env } from "./enviornment";
import "./config/setup-passport";

export function initialize() {
  const app = express();

  // setup auth session
  const sessionConfig = {
    secret: env.expressSessionSecret,
    cookie: {
      secure: false
    }
  };

  if (env.enviornment === "production") {
    sessionConfig.cookie.secure = true;
  }

  app.use(session(sessionConfig));

  // setup database
  sequelize
    .authenticate()
    .then(() => console.log("heroku/postgres connection setup successfully."))
    .catch((err: any) => console.log("heroku/postgres connection failed.", err));

  // initialize passport for authentication
  app.use(passport.initialize());
  app.use(passport.session());

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
