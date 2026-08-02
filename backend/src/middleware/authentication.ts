import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            userRole?: string;
        }
    }
}

interface AuthTokenPayload extends JwtPayload {
    id: string;
    role?: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authentication required" });
    }

    const token = authHeader.slice(7);
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({ error: "Server configuration error" });
    }

    try {
        const decoded = jwt.verify(token, secret) as AuthTokenPayload;
        req.userId = decoded.id;
        if (decoded.role) {
            req.userRole = decoded.role;
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

export default authenticate;
