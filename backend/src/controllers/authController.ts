import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { SignUp, Login } from "../schemas/userSchemas.js";

export class AuthController {

    async signup(req: Request, res: Response) {

        try {

            const parsed = SignUp.safeParse(req.body);

            if (!parsed.success) {
                return res.status(400).json({ error : parsed.error.issues[0]?.message ?? "Invalid input"});
            }

            const { firstName, lastName, email, role, password } = parsed.data;

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

            const log = await prisma.auditLog.create({
                data : {
                    userId : createdUser.id,
                    action : "SIGN UP",
                    resourceType : "USER",
                    resourceId : createdUser.id,
                    createdAt : new Date()
                }
            });

            if (!log){
                return res.status(500).json({ error : "Error creating log"});
            }

            res.status(201).json({
                success : true,
                user: {
                    id: createdUser.id,
                    firstName: createdUser.firstName,
                    lastName: createdUser.lastName,
                    email: createdUser.email,
                    role: createdUser.role
                }
            });


        } catch (error) {
            res.status(500).json({ error : "Error creating user"});
            console.error("Error creating signing up user : ", error);
        }

    }

    async login(req : Request, res: Response) {

        try {

            const parsed = Login.safeParse(req.body);

            if (!parsed.success) {
                return res.status(400).json({ error : parsed.error.issues[0]?.message ?? "Invalid input"});
            }

            const { email, password } = parsed.data;

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

            const secret = process.env.JWT_SECRET;

            if (!secret) {
                return res.status(500).json({ error : "Server configuration error"});
            }

            const payload: { id: string; email: string; role?: string } = {
                id: user.id,
                email: user.email
            };

            if (user.role) {
                payload.role = user.role;
            }

            const token = jwt.sign(
                payload,
                secret,
                { expiresIn : "15m" }
            );

            const log = await prisma.auditLog.create({
                data : {
                    userId : user.id,
                    action : "LOGGED IN",
                    resourceType : "USER",
                    resourceId : user.id,
                    createdAt : new Date()
                }
            });

            if (!log){
                return res.status(500).json({ error : "Error creating log"});
            }

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

            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ error : "Email is required"});
            }

            const user = await prisma.user.findUnique({
                where : { email}
            });

            if (!user) {
                return res.status(200).json({ success:true, message : "Reset Link has been sent to email"})
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            const timer = new Date(Date.now() + 15 * 60 * 1000);

            const hashedToken = await bcrypt.hash(resetToken, 10);

            await prisma.user.update({
                where : { email },

                data : {
                    resetPasswordToken : hashedToken,
                    resetPasswordExpire : timer
                }
            });

            res.status(200).json({ success:true, message : "Reset Link has been sent to email"});

        } catch (error) {
            res.status(500).json({ error : "Internal Server Error"});
            console.error("Error Resetting Password", error);
        }
    }

    async resetPassword(req: Request, res: Response) {

        try {

            const { email, token, newPassword } = req.body;

            if (!email || !token || !newPassword) {
                return res.status(400).json({ error : "Missing fields"});
            }

            const user = await prisma.user.findUnique({
                where : { email }
            });

            if (!user || !user.resetPasswordToken || !user.resetPasswordExpire) {
                return res.status(400).json({ error : "Invalid or expired reset token"});
            }

            if (user.resetPasswordExpire < new Date()) {
                return res.status(400).json({ error : "Invalid or expired reset token"});
            }

            const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);

            if (!isTokenValid) {
                return res.status(400).json({ error : "Invalid or expired reset token"});
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await prisma.user.update({
                where : { email },

                data : {
                    password : hashedPassword,
                    resetPasswordToken : null,
                    resetPasswordExpire : null
                }
            });

            res.status(200).json({ success:true, message : "Password has been reset"});

        } catch (error) {
            res.status(500).json({ error : "Internal Server Error"});
            console.error("Error Resetting Password", error);
        }
    }

    

}

export default new AuthController();
