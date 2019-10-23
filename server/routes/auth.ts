import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import { env } from "../enviornment";

const router = express.Router();

const googleOptions = {
  scope: ["profile"]
};

const googleRedirectOptions = {
  failureRedirect: "/auth/login/failed",
  successRedirect: env.clientURL
};

router.get("/auth/google", passport.authenticate("google", googleOptions));

router.get("/auth/login/failed", (request: Request, response: Response) => {
  response.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

router.get("/auth/google/redirect", passport.authenticate("google", googleRedirectOptions));

router.get("/auth/logout", (req: Request, res: Response) => {
  req.logout();
  res.redirect(env.clientURL);
});

export default router;
