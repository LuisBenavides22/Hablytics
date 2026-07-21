import Anthropic from "@anthropic-ai/sdk";

export const claude_client = new Anthropic({
    apiKey : process.env.ANTHROPIC_API_KEY
});



