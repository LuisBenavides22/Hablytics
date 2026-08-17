import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma.js";
import type { plans } from "@prisma/client";

export const requirePlan = (allowedPlans: plans[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {

            if (!req.userId) {
                return res.status(401).json({ error: "Authentication required" });
            }

            const user = await prisma.user.findUnique({
                where: { id: req.userId },
                select: { plan: true }
            });

            if (!user) {
                return res.status(404).json({ error: "User does not exist" });
            }

            if (!allowedPlans.includes(user.plan)) {
                return res.status(403).json({
                    error: `${user.plan} does not have access, upgrade for this feature`
                });
            }

            next();

        } catch (error) {
            console.error("Plan Authorization Error", error);
            res.status(500).json({ error: "Plan Authorization Error" });
        }
    };
};
