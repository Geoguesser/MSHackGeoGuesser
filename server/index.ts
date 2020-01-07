import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import connectPg from "connect-pg-simple";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import { sequelize } from "./config/setup-database";
import { env } from "./enviornment";
import "./config/setup-passport";

export function initialize() {
  const app = express();
  const pgSession = connectPg(session);
  // setup database
  sequelize
    .authenticate()
    .then(() => console.log("heroku/postgres connection setup successfully."))
    .catch((err: any) => console.log("heroku/postgres connection failed.", err));

  // setup auth session
  const sessionConfig = {
    secret: env.expressSessionSecret,
    store: new pgSession({
      conObject: {
        connectionString: env.database.uri,
        ssl: true
      }
    }),
    resave: false,
    cookie: {
      secure: env.enviornment === "production" ? true : false
    },
    saveUninitialized: true
  };

  app.use(session(sessionConfig));
  app.use(
    cors({
      origin: env.clientURL,
      credentials: true
    })
  );

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
