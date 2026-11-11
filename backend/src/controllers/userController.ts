import prisma from "../config/prisma.js";
import { Request, Response } from 'express';

export class UserController {

    async deleteUser(req: Request, res: Response){
        try {

            if (!req.userId) {
                return res.status(400).json({ error : "User ID is required"});
            }

            const existing_user = await prisma.user.findUnique({
                where : { id: req.userId }
            });

            if (!existing_user) {
                return res.status(400).json({ error : "User does not exist"});
            }

            const deleted_user = await prisma.user.delete({
                where : { id: req.userId }
            });

            res.status(200).json({ success: true, deleted_user});


        } catch (error) {
            console.error('Error deleting user', error);
            res.status(500).json({ error : "Error deleting user"});
        }
    }

    async updateUser(req: Request, res: Response) {

        try {

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication required"});
            }

            const existing_user = await prisma.user.findUnique({
                where : { id: req.userId }
            });

            if (!existing_user){
                return res.status(404).json({ error : "User does not exist"});
            }

            const { firstName, lastName, role } = req.body;

            const data: { firstName?: string; lastName?: string; role?: string } = {};

            if (firstName) data.firstName = firstName;
            if (lastName) data.lastName = lastName;
            if (role) data.role = role;

            const updateUser = await prisma.user.update({
                where : { id: req.userId },

                data,

                select : {
                    firstName : true,
                    lastName : true,
                    email : true,
                    role : true
                }
            });

            res.status(200).json({ success:true, updateUser});

        } catch (error) {
            console.error("Error updating user", error);
            res.status(500).json({ error : "Error updating user"});
        }
    }

    async getUser(req: Request, res: Response) {

        try {

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication required"});
            }

            const user = await prisma.user.findUnique({
                where : { id: req.userId },

                select : {
                    id : true,
                    firstName : true,
                    lastName : true,
                    role : true,
                    plan : true,
                    createdAt : true,
                    updatedAt : true
                }
            });

            if (!user) {
                return res.status(404).json({ error : "User does not exist"});
            }

            res.status(200).json({ success:true, user});


        } catch (error) {
            console.error("Error fetching user", error);
            res.status(500).json({ error : "Error fetching users"});
        }
    }

    async getUserConnections(req: Request, res: Response) {

        try {

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication required"});
            }

            const user = await prisma.user.findUnique({
                where : { id: req.userId },

                include : {
                    connections : true,
                }
            });

            if (!user) {
                return res.status(404).json({ error : "User does not exist"});
            }

            res.status(200).json({
                 success:true,
                connections : user.connections
            });

        } catch (error) {
            console.error("Error getting user connections", error);
            res.status(500).json({ error : "Error getting user connections"});
        }
    }

    async getUserReports(req: Request, res: Response){

        try {

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication required"});
            }

            const user = await prisma.user.findUnique({
                where : { id: req.userId },

                include : {
                    reports : true,
                }
            });

            if (!user) {
                return res.status(404).json({ error : "User does not exist"});
            }

            res.status(200).json({
                 success: true,
                 reports: user.reports
            });


        } catch (error) {
            console.error("Error fetching user reports", error);
            res.status(500).json({ error : "Error fetching user reports"});
        }
    }

    async getUserPlans(req: Request, res: Response){

        try {

            if (!req.userId){
                return res.status(401).json({ error : "Authentication Required"});
            }
            
            const plans = await prisma.plan.findMany({
                where : { userId : req.userId },

                orderBy : {
                    createdAt : "desc"
                }
            });

            if (!plans){
                return res.status(404).json({ error : "No Plans Found"});
            }

            res.status(200).json({ 
                success: true, 
                plans
            });

        } catch (error){
            console.error("Error getting user plans", error);
            res.status(500).json({ error : "Error getting user plans"});
        }
    }
}

export default new UserController();
