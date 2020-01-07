import express from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import cors from "cors";
import passport from "passport";
import { sequelize } from "./setup-database";
import { env } from "../enviornment";

function setupAppSession(app: express.Application) {
  // connects the postgres table to our express-session
  const pgSession = connectPg(session);

  const config = {
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

  app.use(session(config));

  // initialize passport for authentication
  app.use(passport.initialize());
  app.use(passport.session());
}

function setupCors(app: express.Application) {
  app.use(
    cors({
      credentials: true
    })
  );
}

function setupSequelize(app: express.Application) {
  sequelize
    .authenticate()
    .then(() => console.log("heroku/postgres connection setup successfully."))
    .catch((err: any) => console.log("heroku/postgres connection failed.", err));
}

export { setupAppSession, setupCors, setupSequelize };
