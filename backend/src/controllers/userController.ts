import { GoTrueAdminApi } from "@supabase/supabase-js";
import prisma from "../config/prisma";
import { Request, Response } from 'express';

export class UserController {

    async createUser(req: Request, res: Response) {

        try {

            const { firstName, lastName, id, email, role} = req.body;

            if (!id || !email || !firstName || !lastName || !role) {
                return res.status(400).json({ error : "Missing fields"});
            }

            const existing_user = await prisma.user.findUnique({
                where : { id }
            });

            if (existing_user) {
                return res.status(400).json({ error : "User already exists"});
            }

            const user = await prisma.user.create({
                data : { 
                    id, 
                    firstName,
                    lastName, 
                    email,
                    role
                },

                select : {
                    id : true,
                    firstName: true,
                    lastName: true,
                    email : true,
                    role : true,
                    createdAt : true
                }
            });

            res.status(201).json({ success: true, user});

        } catch (error) {
            console.error('Error creating user', error);
            res.status(500).json({ error : "Error creating user"});
        }

    }

    async deleteUser(req: Request, res: Response){
        try {

            const id = req.params.email as string;

            if (!id) {
                return res.status(400).json({ error : "User ID is required"});
            }

            const existing_user = await prisma.user.findUnique({
                where : { id }
            });
            
            if (!existing_user) {
                return res.status(400).json({ error : "User does not exist"});
            }

            const deleted_user = await prisma.user.delete({
                where : { id }
            });

            res.status(200).json({ success: true, deleted_user});

        
        } catch (error) {
            console.error('Error deleting user', error);
            res.status(500).json({ error : "Error deleting user"});
        }
    }

    async updateUser(req: Request, res: Response) {
        
        try {

            const id = req.params.id as string;

            if (!id) {
                return res.status(400).json({ error : "User ID is required"});
            }

            const existing_user = await prisma.user.findUnique({
                where : { id }
            });

            if (!existing_user){
                return res.status(404).json({ error : "User does not exist"});
            }

            const updateUser = await prisma.user.update({
                where : { id },

                data : {
                    
                },

                select : {
                    name : true,
                    email : true
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

            const id = req.params.email as string;

            if (!id) {
                return res.status(400).json({ error : "User ID required"});
            }

            const user = await prisma.user.findUnique({
                where : { id },

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

    async getAll(req: Request, res: Response) {

        try {

            const id = req.params.email as string;

            if (!id) {
                return res.status(400).json({ error : "User ID is required"});
            }

            const users = await prisma.user.findMany({
                where : { id },

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

            if (users.length === 0) { 
                return res.status(404).json({ error: "No users found"});
            }

            res.status(200).json({ success:true, users});

        } catch (error) {
            console.error("Error fetching all users", error);
            res.status(500).json({ error : "Error fetching all users"});
        }
    }

    async updateRole(req: Request, res : Response) {

        try {

            const id = req.params.id as string;
            const role = req.body.role as string;

            if (!id) {
                return res.status(400).json({ error : "User ID is required"});
            }

            if (!role) {
                return res.status(400).json({ error : "Role is required"});
            }

            const user = await prisma.user.findUnique({
                where : { id }
            });

            if (!user) {
                return res.status(400).json({ error : "User not found"});
            }

            const updateUser = await prisma.user.update({
                where : { id },

                data : {
                    role

                }
            });

            res.status(201).json({ success:true, updateUser});

        } catch (error) {
            console.error("Error updating role", error);
            res.status(500).json({ error : "Error updating users"});
        }
    }

    async getUserConnections(req: Request, res: Response) {

        try {

            const id = req.params.id as string;

            const user = await prisma.user.findUnique({
                where : { id },

                include : {
                    connections : true,
                }
            });

            if (!user) { 
                return res.status(400).json({ error : "User does not exist"});
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

            const id = req.params.id as string;

            const user = await prisma.user.findUnique({
                where : { id },

                include : {
                    reports : true,
                }
            });

            if (!user) {
                return res.status(400).json({ error : "User does not exist"});
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

}

export default new UserController();