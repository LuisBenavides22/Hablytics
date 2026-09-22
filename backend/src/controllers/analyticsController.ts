import { success } from "zod";
import prisma from "../config/prisma.js";
import { Request, Response } from "express";


export class AnalyticsController {

    async getSummary(req: Request, res: Response) {

        try {

            if (!req.userId){
                return res.status(401).json({ error : "Authentication Required"});
            }

            const userId = req.userId;

            const [total, lastReport] = await Promise.all([
                prisma.report.count({
                    where : { userId }
                }),

                prisma.report.findFirst({
                    where : { userId },
                    orderBy : {
                        createdAt : "desc"
                    }
                }),

            ]);

            res.status(200).json({ success:true, total, lastReport});
                  

        } catch(error) {
            console.error("Error getting summary : ", error);
        }

    }

    async getReportByService(req: Request, res: Response) {

        try {

            if (!req.userId) {
            return res.status(401).json({ error : "Authentication Required"});
            }

            const user = req.userId;
    
            const platform = (req.query.platform as string).toUpperCase();

            const report = await prisma.report.findFirst({
                where : { platform : platform, userId : user },

                orderBy : {
                    createdAt : "desc"
                }
            }); 


            if (!report) {
                return res.status(400).json({ error : "No reports for this service found"});
            }


            res.status(200).json({ success: true, report});

        } catch (error) {
            res.status(500).json({ error : "Error getting service report"});
            console.error("Error getting service report : ", error);
        }    
    }


}

export default new AnalyticsController();