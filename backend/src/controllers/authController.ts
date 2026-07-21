import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthController {

    async signup(req: Request, res: Response) {

        try {

            const { firstName, lastName, email, role, password } = req.body;

            if (!firstName || !lastName || !email || !role || !password) {
                return res.status(400).json({ error : "Missing fields"});
            }

            const existing_user = await prisma.user.findUnique({
                where : { email}
            });

            if (existing_user) {
                return res.status(400).json({ error : "User already exists "});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const createdUser = await prisma.user.create({
                data : {
                    firstName,
                    lastName,
                    email,
                    role,
                    password : hashedPassword
                }
            });

            res.status(201).json({ success : true, createdUser});


        } catch (error) {
            res.status(500).json({ error : "Error creating user"});
            console.error("Error creating signing up user : ", error);
        }

    }

    async login(req : Request, res: Response) {

        try {

            const { email , password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error : "Missing fields"});
            }

            const user = await prisma.user.findUnique({
                where : { email }
            });

            if (!user || !user.password) {
                return res.status(400).json({ error : "Invalid email or password"});
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ error : "Invalid Password"});
            }

            const payload = {
                user,
                email
            };

            const secret = process.env.JWT_SECRET;

            const token = jwt.sign(
                payload,
                secret,
                { expiresIn : "15m" }
            );

            res.status(200).json({
                success: true,
                token,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                }
            });

            
        } catch (error) {
            res.status(500).json({ error : "Sign Up Error"});
            console.error("Internal Server Error during Sign Up : ",  error);
        }

    }

    async forgotPassword(req: Request, res: Response) {

        try {
            



        } catch (error) {
            res.status(500).json({ error : "Internal Server Error"});
            console.error("Error Resetting Password", error);
        }
    }

    async resetPassword(req: Request, res: Response) {

        try {

            


        } catch (error) {
            res.status(500).json({ error : "Internal Server Error"});
            console.error("Error Resetting Password", error);
        }
    }

}

export default new AuthController();