import { claude_client } from "../config/anthropic";


export const main = async (rawData : string) => {

    try {

        const systemPrompt = `You are an elite Executive Coach and Career Strategist. Your objective is to analyze the provided workspace data (communications, project updates, code reviews, or documents) and identify actionable opportunities for the user to elevate their professional standing.

                    Analyze the data and extract insights across the following four pillars:

                    1. Technical & Execution Gaps: Identify areas where the user can optimize a workflow, learn a specific new tool mentioned in the data, or improve their technical output.
                    2. Strategic & Business Impact: Identify opportunities for the user to take ownership of a project, improve team efficiency, or align closer with company goals.
                    3. Soft Skills & Leadership: Evaluate collaboration, tone, and emotional intelligence. Suggest specific ways to increase visibility, communicate more effectively, or demonstrate leadership (even without a title).
                    4. Hidden "Wins": Identify achievements, resolved bottlenecks, or successful collaborations in the data that the user should document for their next performance review or resume update.

                    Respond strictly in valid JSON format matching the structure below. Do not include markdown formatting or any conversational text outside of the JSON object.

                    {
                        "summary": "A 2-sentence summary of the user's current workspace dynamic.",
                        "hidden_wins": ["win 1", "win 2"],
                        "growth_opportunities": [
                    {
                        "category": "Technical" | "Strategic" | "Soft Skill",
                        "observation": "What you noticed in the data.",
                        "action_item": "A specific, actionable step the user should take."
                    }
                    ],
                        "networking_targets": ["Names or roles of people the user should connect with based on the data."]
                    }`


        const MAX_CHARS = 40000;

        let safeData

        if (rawData.length > MAX_CHARS) {
            safeData = rawData.substring(0, MAX_CHARS) + "\n [DATA HAS BEEN TRUNCATED]";
        } else {
            safeData = rawData;
        }

        const response = await claude_client.messages.create({
            model : "claude-haiku-4-5",
            max_tokens: 1150,
            temperature: 0.2,
            system : systemPrompt,
            messages: [
                {
                role : 'user',
                content: `Here is the raw workspace data for you to analyze. Please extract the insights exactly as 
                requested in your system 
                instructions:\n\n<workspace_data>\n${safeData}\n</workspace_data>`
                }
            ]
        });

        const rawText = (response.content[0] as any).text;
        const cleanText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        return JSON.parse(cleanText);

    } catch (error : any) {
        console.error("ANTHROPIC API ERROR!", error);
        throw new Error("ANTHROPIC API ERROR");
    }
}