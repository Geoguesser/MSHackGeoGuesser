import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import { env } from "../enviornment";

const router = express.Router();

// client sends user to this route this sends user to google login
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// this is where the user is sent after logging in with google
router.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
    successRedirect: env.clientURL
  })
);

// if the login was unsuccessful from our end, they are then sent here (as seen by `failureRedirect` above)
router.get("/auth/login/failed", (request: Request, response: Response) => {
  response.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// logs the user out
router.get("/auth/logout", (req: Request, res: Response) => {
  req.logout();
  res.redirect(env.clientURL);
});

export default router;
