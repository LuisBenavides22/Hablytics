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
            if (!secret) {
                throw new Error("JWT_SECRET is not set in environment variables");
            }

            const token = jwt.sign(
                payload,
                secret,
                { expiresIn : "15m" }
            );

            const refreshSecret = process.env.JWT_REFRESH_SECRET || secret;
            const refreshToken = jwt.sign(
                payload,
                refreshSecret,
                { expiresIn: "7d" }
            );

            // Set refresh token in HTTP-only cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

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
                return res.status(400).json({ error: "Email is required" });
            }

            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                // Return success even if user not found to prevent email enumeration
                return res.status(200).json({ success: true, message: "If that email is registered, a password reset link has been sent." });
            }

            const payload = {
                id: user.id,
                email: user.email
            };
            const secret = process.env.JWT_SECRET + (user.password || "");

            const token = jwt.sign(payload, secret, { expiresIn: "15m" });

            // In a real application, you would send an email here with a link containing the token and user id
            // e.g. `http://frontend.url/reset-password/${user.id}/${token}`

            res.status(200).json({ success: true, message: "If that email is registered, a password reset link has been sent." });

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            console.error("Error in forgot password: ", error);
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { id, token, newPassword } = req.body;

            if (!id || !token || !newPassword) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const user = await prisma.user.findUnique({
                where: { id: id }
            });

            if (!user) {
                return res.status(400).json({ error: "Invalid reset link" });
            }

            const secret = process.env.JWT_SECRET + (user.password || "");
            
            try {
                jwt.verify(token, secret);
            } catch (err) {
                return res.status(400).json({ error: "Invalid or expired reset link" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword }
            });

            res.status(200).json({ success: true, message: "Password has been successfully reset" });

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            console.error("Error Resetting Password", error);
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies?.refreshToken;

            if (!refreshToken) {
                return res.status(401).json({ error: "Access denied. No refresh token provided." });
            }

            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT_SECRET is not set");
            }
            const refreshSecret = process.env.JWT_REFRESH_SECRET || secret;

            try {
                const decoded = jwt.verify(refreshToken, refreshSecret) as any;

                // Issue a new access token
                const payload = {
                    user: decoded.user,
                    email: decoded.email
                };

                const token = jwt.sign(payload, secret, { expiresIn: "15m" });

                res.status(200).json({ success: true, token });
            } catch (error) {
                return res.status(401).json({ error: "Invalid or expired refresh token." });
            }

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            console.error("Error in refresh token: ", error);
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            res.status(200).json({ success: true, message: "Logged out successfully" });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            console.error("Error in logout: ", error);
        }
    }

}

export default new AuthController();