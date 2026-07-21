// src/test-ai.ts
import 'dotenv/config';
import { main } from './services/ai-service'; // Adjust this path if needed

const fakeWorkspaceData = `
--- Slack Thread: #project-apollo ---
Sarah (Product Manager): Hey Luis, the client just asked if we can add real-time PDF exports to the dashboard by Friday. Is that doable?

Luis: Hey Sarah. I looked into the PDF library. We *could* hack it together by Friday, but it will block the main thread and slow down the app for everyone else. Since our Q3 OKR is strictly focused on system performance, I recommend we scope this for the next sprint so we can implement a proper background job queue (maybe using Redis). Happy to jump on a call with you to explain the tradeoff to the client!

Sarah: Good catch. Let's push it to next sprint. I'll let them know.

--- GitHub PR #402 Review ---
Author: Alex (Junior Dev)
Reviewer: Luis
Comments:
Luis: Great work getting this feature across the finish line, Alex! The UI looks pixel-perfect. 
I did notice one architectural thing: we are querying the database inside the 'for' loop on line 45. If a user has 10,000 records, this will crash the server (classic N+1 query problem). I left a code snippet below using a single bulk query to grab everything in one trip. 
Let me know if you want to jump on a quick 15-minute call to pair program on it!
`;



async function runTest() {
    console.log("🚀 Sending data to Claude...");
    try {
        const result = await main(fakeWorkspaceData);
        console.log("✅ SUCCESS! Here is your AI JSON:\n");
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("❌ FAILED:", error);
    }
}

runTest();

