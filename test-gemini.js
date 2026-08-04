const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('No API key found in env');
    process.exit(1);
}

const SYSTEM_PROMPT = "Test system prompt";

const formattedHistory = [
    { role: 'user', parts: [{ text: 'Hello' }] },
    { role: 'model', parts: [{ text: 'Hello! I am NattyAI. How can I help you today?' }] },
    { role: 'user', parts: [{ text: 'test' }] }
];

async function run() {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: SYSTEM_PROMPT }]
                    },
                    contents: formattedHistory,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500,
                    }
                }),
            }
        );

        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(err);
    }
}

run();
