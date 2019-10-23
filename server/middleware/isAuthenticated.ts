import { Request, Response, NextFunction } from "express";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({
      error: "User is not authenticated"
    });
  }
}

export { isAuthenticated };
