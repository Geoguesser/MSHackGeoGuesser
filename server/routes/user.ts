import express, { Request, Response } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = express.Router();

router.get("/user", isAuthenticated, (req: Request, res: Response) => {
  res.json({
    user: req.user
  });
});

export default router;
