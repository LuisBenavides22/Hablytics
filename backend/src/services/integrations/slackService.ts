import { WebClient } from "@slack/web-api";

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

export class SlackService {

    static async fetchandNormalize(oauthtoken : string) {

        try {

            // Profile data
            const profiles = await web.users.profile.get({
                token: oauthtoken,
            });

            if (!profiles.provided) {
                throw new Error("No profile data provided");
            }

            // Lists all users in a slack team
            const users = await web.users.list({
                token : oauthtoken,
                limit: 30,
                include_locale: true
            });

            if (!users.members || users.members.length === 0) {
                throw new Error("No users found in this workspace");
            }
            
            const all_convos = await web.conversations.list({
                token : oauthtoken,
                exclude_archived: true,
                limit: 50
            });

            if (!all_convos.channels || all_convos.channels.length === 0) {
                console.log("No channels found.");
                return "No channel data available.";
            }




        } catch (error) {
            console.error("Error fetching Slack Data", error);
            throw new Error("Error fetching Slack Data");
        }
    }

}

