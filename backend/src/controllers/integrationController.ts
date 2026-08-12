import prisma from "../config/prisma.js";
import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import 'dotenv/config';

export class IntegrationController {

    async githubRedirect(req: Request, res: Response) {

        try {

            const clientId = process.env.GITHUB_CLIENT_ID;
            const secret = process.env.JWT_SECRET;

            if (!clientId || !secret) {
                return res.status(500).json({ error : "Server Configuration Error"});
            }

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication required"});
            }

            const state = jwt.sign({ userId: req.userId }, secret, { expiresIn: "10m" });

            const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo&state=${encodeURIComponent(state)}`;

            res.redirect(githubAuthUrl);

        } catch (error) {
            console.error("Error redirecting to github", error);
            res.status(500).json({ error : "Error redirecting to github"});
        }
    }

    async githubCallback(req: Request, res: Response) {

        try {

            const code = req.query.code as string;
            const state = req.query.state as string;
            const secret = process.env.JWT_SECRET;

            if (!code) {
                return res.status(400).json({ error: "No code provided by GitHub" });
            }

            if (!state || !secret) {
                return res.status(400).json({ error: "Invalid OAuth state" });
            }

            let userId: string;

            try {
                const decoded = jwt.verify(state, secret) as { userId: string };
                userId = decoded.userId;
            } catch (error) {
                return res.status(400).json({ error: "Invalid or expired OAuth state" });
            }

            const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code: code
                })
            });

            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;

            if (!accessToken) {
                return res.status(400).json({ error: "GitHub did not return an access token" });
            }

            await prisma.workspaceConnection.upsert({
                where: { userId_platform: { userId, platform: "GITHUB" } },
                update: { accessToken },
                create: { userId, platform: "GITHUB", accessToken }
            });

            res.status(200).json({ success: true, message: "GitHub Connected!" });

        } catch (error) {
            console.error("Github callback error", error);
            res.status(500).json({ error : "Github callback error"});
        }
    }

}

export default new IntegrationController();
