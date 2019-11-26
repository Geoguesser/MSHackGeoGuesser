import { Request, Response, NextFunction } from "express";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          console.log("there was an issue destroying the session", err);
        }
      });
    }
    return res.status(401).json({
      error: "User is not authenticated"
    });
  }
}

export { isAuthenticated };
