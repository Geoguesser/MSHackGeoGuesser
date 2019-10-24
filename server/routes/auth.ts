import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import { env } from "../enviornment";

const router = express.Router();

const googleOptions = {
  scope: ["profile"]
};

const googleRedirectOptions = {
  failureRedirect: "/auth/login/failed"
};

router.get(
  "/auth/google",
  function(req: any, res: any, next: NextFunction) {
    console.log("/auth/google");
    next();
  },
  passport.authenticate("google", googleOptions)
);

router.get("/auth/login/failed", (request: Request, response: Response) => {
  console.log("LOGIN FAILED AT /auth/login/failed");
  response.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", googleRedirectOptions),
  function(req: Request, res: Response) {
    console.log("/auth/google/redirect");
    console.log("SESSION:", req.session);
    res.redirect(`${env.clientURL}/?username=test`);
  }
);

router.get("/auth/logout", (req: Request, res: Response) => {
  console.log("/auth/logout");
  req.logout();
  res.redirect(env.clientURL);
});

export default router;
