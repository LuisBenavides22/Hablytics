import { Octokit } from "octokit";

export class GithubService {

    static async fetchAndNormalize(oauthtoken : string, username : string, repo: string) {

        try {

            // Octokit client initalized with access token 
            const octokit = new Octokit({
                auth : oauthtoken
            });

            // Gets pull request data 
            const prs = await octokit.paginate(octokit.rest.pulls.list , {
                owner : username,
                repo : repo,
                per_page: 100,
            });

            // Gets commits data 
            const commits = await octokit.paginate(octokit.rest.repos.listCommits, {
                owner: username,
                repo: repo,
                author: username,
                per_page: 100
            });

            const userPrs = prs.filter(pr => pr.user?.login === username);

            return this.normalizeForAi(commits, prs, username, repo);

            
        } catch (error) {
            console.error("Error fetching Github Data", error);
            throw new Error("Error fetching Github data");
        }
    }

    private static normalizeForAi(commits: any[], prs: any[], username: string, repo: string): string {
        let cleanText = `GITHUB WORK BEHAVIOR REPORT\n`;
        cleanText += `User: ${username} | Repository: ${repo}\n\n`;

        cleanText += `--- PULL REQUEST COMMUNICATION (${prs.length} total) ---\n`;
        prs.forEach(pr => {
            const bodyText = pr.body ? pr.body.replace(/\n/g, " ") : "[NO DESCRIPTION PROVIDED]";
            cleanText += `Title: "${pr.title}" (Status: ${pr.state})\n`;
            cleanText += `Description: ${bodyText}\n\n`;
        });

        cleanText += `--- COMMIT MESSAGES (${commits.length} total) ---\n`;
        commits.forEach(item => {
            const cleanMessage = item.commit.message.replace(/\n/g, " "); 
            const date = new Date(item.commit.author.date).toISOString().split('T')[0];
            cleanText += `[${date}]: ${cleanMessage}\n`;
        });

        return cleanText;
    }

}