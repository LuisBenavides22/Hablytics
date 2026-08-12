import prisma from "../config/prisma.js"
import { Request, Response } from "express";


export class reportController {

    async listMyReports(req: Request, res: Response) {

        try {

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication required"});
            }

            const report = await prisma.report.findMany({
                where : { userId: req.userId },

                orderBy : {
                    createdAt: "desc"
                }
            });

            res.status(200).json({ success:true,
                count : report.length,
                report
            });

        } catch (error) {
            console.error("Error getting reports");
            res.status(500).json({ error : "Error getting reports"});
        }
    }

    async getReportById(req: Request, res: Response) {
        try {

            const id = req.params.id as string;

            if (!id) {
                return res.status(400).json({ error : "Project ID is Required"})
            }

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication required"});
            }

            const report = await prisma.report.findFirst({
                where : { id, userId: req.userId }
            });

            if (!report) {
                return res.status(404).json({ error : "Report Not Found"});
            }

            res.status(200).json({
                success: true,
                report
            });

        } catch (error) {
            console.error("Error getting report with ID", error);
            res.status(500).json({error : "Error getting report with ID"});
        }
    }

    async deleteReport(req: Request, res: Response) {
        try {

            const id = req.params.id as string;

            if (!id) {
                return res.status(400).json({ error : "Project ID is Required"})
            }

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication required"});
            }

            const reportExists = await prisma.report.findFirst({
                where : { id, userId: req.userId }
            });

            if (!reportExists) {
                return res.status(404).json({ error : "Report does not exist"})
            }

            const deleteReport = await prisma.report.delete({
                where : { id }
            });

            res.status(200).json({
                success : true,
                deleteReport
            });

        } catch (error) {
            console.error("Error deleting report with ID", error);
            res.status(500).json({error : "Error deleting report with ID"});
        }
    }
}
export default new reportController();