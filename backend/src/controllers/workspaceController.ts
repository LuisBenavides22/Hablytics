import prisma from "../config/prisma";
import { Request, Response } from 'express';
import { GithubService } from "../services/integrations/github";
import { main } from "../services/ai-service";
import { SlackService } from "../services/integrations/slackService";

export class workspaceController {

    async getReport(req: Request, res: Response) {

        try {

            const { username, repo , platform , workspaceID } = req.body;

            const connection = await prisma.workspaceConnection.findFirst({
                where : {
                    id : workspaceID,
                    platform
                }
            });

            if (!connection || !connection.accessToken) {
                res.status(400).json({
                    error : `You need to connect your ${platform} account first`
                });
            }

            let text = ""

            switch(platform) {

                case "GITHUB":
                    if (!username || !repo) {
                        return res.status(400).json({ error : "Github requires a username and a repo"});
                    }

                    text = await GithubService.fetchAndNormalize(connection?.accessToken ?? '', username, repo);
                    break;

                case "SLACK":
                    text = await SlackService.fetchandNormalize(connection?.accessToken ?? '');

                    break;

                case "MICROSOFT":

                    break;

                default:
                    return res.status(400).json({ error : "Unsupported platform"});

            }

            const aiReport = main(text);

            if (!aiReport) {
                res.status(500).json({ error : "Failed to push data to AI server"});
            }

        } catch (error) {
            console.error("Error generating report : ", error);
            res.status(500).json({ error : "Error generating report"});
        }
    
    }

}

export default new workspaceController();