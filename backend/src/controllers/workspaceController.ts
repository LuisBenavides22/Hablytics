import prisma from "../config/prisma.js";
import { Request, Response } from 'express';
import { GithubService } from "../services/integrations/github.js";
import { main } from "../services/ai-service.js";
import { SlackService } from "../services/integrations/slackService.js";

export class workspaceController {

    async getReport(req: Request, res: Response) {

        try {

            const { username, repo, platform, workspaceID } = req.body;

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication required"});
            }

            if (!platform || !workspaceID) {
                return res.status(400).json({ error : "platform and workspaceID are required"});
            }

            const connection = await prisma.workspaceConnection.findFirst({
                where : {
                    id : workspaceID,
                    platform
                }
            });

            if (!connection || !connection.accessToken) {
                return res.status(400).json({
                    error : `You need to connect your ${platform} account first`
                });
            }

            if (connection.userId !== req.userId) {
                return res.status(403).json({ error : "You do not have access to this connection"});
            }

            let text = "";

            switch(platform) {

                case "GITHUB":
                    if (!username || !repo) {
                        return res.status(400).json({ error : "Github requires a username and a repo"});
                    }

                    text = await GithubService.fetchAndNormalize(connection.accessToken, username, repo);
                    break;

                case "SLACK":
                    text = (await SlackService.fetchandNormalize(connection.accessToken)) ?? "";
                    break;

                case "MICROSOFT":
                    return res.status(400).json({ error : "Microsoft integration is not available yet"});

                default:
                    return res.status(400).json({ error : "Unsupported platform"});

            }

            const aiReport = await main(text);

            if (!aiReport) {
                return res.status(500).json({ error : "Failed to push data to AI server"});
            }

            const report = await prisma.report.create({
                data : {
                    userId : req.userId,
                    platform,
                    summary : aiReport.summary,
                    hiddenWins : aiReport.hidden_wins ?? [],
                    growthOpportunities : aiReport.growth_opportunities ?? [],
                    networkingTargets : aiReport.networking_targets ?? []
                }
            });

            res.status(201).json({ success : true, report });

        } catch (error) {
            console.error("Error generating report : ", error);
            res.status(500).json({ error : "Error generating report"});
        }

    }

}

export default new workspaceController();
