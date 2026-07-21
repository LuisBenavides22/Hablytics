import prisma from "../config/prisma";
import { Request, Response } from 'express';
import 'dotenv/config';


export class AuthController {


    async githubRedirect(req: Request, res: Response) {

        try {

            const clientId = process.env.GITHUB_CLIENT_ID;

            if (!clientId) {
                return res.status(500).json({ error : "Server Configuration Error"});
            }

            const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;

            res.redirect(githubAuthUrl);

        } catch (error) {
            console.error("Error redirecting to github", error);
            res.status(500).json({ error : "Error redirecting to github"});
        }
    }

    async githubCallback(req: Request, res: Response) {

        try {

            const code = req.query.code as string;
            
            if (!code) {
                return res.status(400).json({ error: "No code provided by GitHub" });
            }

            // 2. Use native fetch instead of Axios
            const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' // Forces GitHub to return JSON instead of a weird text string
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code: code
                })
            });

            // Parse the JSON response
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;

            // 3. (Mock Step) Assuming you have a user ID
            const userId = "user_123"; 

            // 4. Save to the database using your imported Prisma
            await prisma.workspaceConnection.upsert({
                where: { userId_platform: { userId: userId, platform: "GITHUB" } },
                update: { accessToken: accessToken },
                create: { userId: userId, platform: "GITHUB", accessToken: accessToken }
            });

            res.status(200).json({ success: true, message: "GitHub Connected!" });


        } catch (error) {
            console.error("Github callback error", error);
            res.status(500).json({ error : "Github callback error"});
        }
    }

}

export default new AuthController();