import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import "./config/setup-passport";
import authRoutes from "./routes/auth";

export function initialize() {
  const app = express();
  const port = process.env.PORT || 5000;
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", authRoutes);
  app.get("/api", (req, res) => {
    res.send({ express: "Hello from express" });
  });

  app.listen(port, () => console.log("listening on port " + port));
}
