import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authorize = (requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ message: "Access denied" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded: any = jwt.verify(token, "your_secret_key");
      const userPermissions = decoded.permissions || [];

      const hasPermission = requiredPermissions.every((perm) => userPermissions.includes(perm));
      if (!hasPermission) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (err) {
      res.status(403).json({ message: "Invalid token" });
    }
  };
};
