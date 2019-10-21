import express, { Request, Response } from "express";
import passport from "passport";

const router = express.Router();

const googleOptions = {
  scope: ["profile"]
};

const googleRedirectOptions = {
  failureRedirect: "/auth/login/failed",
  successRedirect: "http://localhost:3000"
};

router.get("/auth/google", passport.authenticate("google", googleOptions));

router.get("/auth/login/failed", (request: Request, response: Response) => {
  response.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

router.get("/auth/google/redirect", passport.authenticate("google", googleRedirectOptions));

export default router;
