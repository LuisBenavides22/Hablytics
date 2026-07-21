import { Request , Response } from 'express';
import prisma from "../config/prisma";

export class AuditlogController {

    async getAllLogs(req: Request, res: Response) {

        try {

            const logs = await prisma.auditLog.findMany({

                orderBy : {
                    createdAt : "desc"
                },
       
                include : {
                    user : true,
                }

            });

            if (!logs) {
                return res.status(400).json({ error : "Error getting logs"});
            }

        } catch (error) {
            console.error("Error getting all logs" ,error);
            res.status(500).json({ error : "Error getting all logs"});
        }
    }

    async userlogs(req: Request, res: Response) {

        try {

            const id = req.params.id as string;

            if (!id) {
                return res.status(400).json({ error : "ID is required"});
            }

            const user = await prisma.user.findUnique({
                where : { id },

                include : {
                    auditLogs : true,
                }
            });

            if (!user) {
                return res.status(400).json({ error : "User does not exist"});
            }

            res.status(200).json({ success:true, user});

        } catch (error) {
            console.error("Error getting user logs");
            res.status(500).json({ error : "Error getting user logs"});
        }
        
    }

    async createLog(req: Request, res: Response) {

        try {

            const { userId, action, resourceType, resourceId, metadata} = req.body;

            if (!action ) {
                return res.status(400).json({ error : "Missing fields"});
            }

            const createdlog = await prisma.auditLog.create({
                data : {
                    userId,
                    action,
                    resourceType,
                    resourceId,
                    metadata
                }
            });

            res.status(201).json({ success:true, createdlog});

        } catch (error) {
            console.error("Error creating log", error);
            res.status(500).json({ error : "Error creating log"});
        }
    }

    async getlogsbyID(req: Request, res: Response) {

        try {

            const id = req.params.id as string;

            if (!id) {
                return res.status(400).json({ error : "Log ID is required"});
            }

            const log = await prisma.auditLog.findUnique({
                where : { id },

                include : {
                    user : true
                }
            });

            if (!log) {
                return res.status(404).json({ error : "Log not found!"});
            }

            res.status(200).json({ success:true, log});

        } catch (error) {
            console.error("Error fetching logs by ID");
            res.status(500).json({ error : "Error fetching logs by ID"});
        }
    }
}

export default new AuditlogController();