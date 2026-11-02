import { claude_client } from "../config/anthropic.js";
import { PlanList } from "../schemas/planSchemas.js";

export const aiPlanService = async (rawData : string) => {

    const prompt = `
        You are a career coach for college students and early-career professionals.
        You will receive a workplace skills report with three parts: a summary of the
        person's work patterns, hidden wins, and growth opportunities.

        Create a 30-day improvement plan that closes the gaps listed under growth
        opportunities. Build on the strengths in the summary and hidden wins.

        Rules:
            - Create 8 to 12 tasks spread across 4 weeks.
            - Each task must be concrete and doable in a few hours or less, with a clear
              finish line (for example "Write and merge a PR that adds tests for X"
                rather than "Improve testing").
            - Cover the growth opportunity categories in the report: technical, strategic
                and soft skills. Do not invent gaps that are not in the report.
            - Order tasks so earlier weeks build toward later ones.

            Output format:
                Respond with ONLY a valid JSON array. No markdown, no code fences, no text
                before or after it. Every item must have exactly these keys:

            - "title": string, a short action phrase (under 80 characters)
            - "category": one of "technical", "strategic", "soft"
            - "week": integer from 1 to 4
            - "description": string, 1 to 2 sentences explaining what to do and why

        Example:
        [
            {
                "title": "Write a PR description template",
                "category": "soft",
                "week": 1,
                "description": "Draft a template covering context, changes and testing, then use it on your next 3 PRs."
            }
        ]`;


    const maxChars = 40000;

    let safeData;

    if (rawData.length > maxChars){
        safeData = rawData.substring(0, maxChars) + " \n [DATA HAS BEEN TRUNCATED]";
    } else {
        safeData = rawData;
    }

    let lastError = "";

    for (let attempt = 0; attempt < 2; attempt++){

        const msg = await claude_client.messages.create({
            model : "claude-sonnet-4-5",
            max_tokens: 3000,
            temperature : 0.2,
            system : prompt,
            messages : [
                {
                    role : "user",
                    content : `Here is the report for you to make a plan and what to do to get better : ${safeData}`
                }
            ]
        });

        const block = msg.content.find((b) => b.type === "text");

        if (!block || block.type !== "text"){
            lastError = "No text in AI response";
            continue;
        }

        const cleaned = block.text
            .trim()
            .replace(/^```(?:json)?\s*/i, "")
            .replace(/\s*```$/, "");

        let parsed;

        try {
            parsed = JSON.parse(cleaned);
        } catch {
            lastError = "AI response was not valid JSON";
            continue;
        }

        const validated = PlanList.safeParse(parsed);

        if (!validated.success){
            lastError = `Schema Mismatch: ${validated.error.message}`;
            continue;
        }

        return validated.data;
    }

    throw new Error(`Plan generation failed after retry: ${lastError}`);

}