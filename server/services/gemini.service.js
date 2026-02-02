import fetch, { Headers } from "node-fetch";
globalThis.fetch = fetch;
globalThis.Headers = Headers;

import { VertexAI } from "@google-cloud/vertexai";
import dotenv from "dotenv";
import { SYSTEM_PROMPT } from "../prompts/system.prompt.js";

dotenv.config();

if (!process.env.PROJECT_ID) {
  throw new Error("PROJECT_ID is missing in .env");
}

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error("GOOGLE_APPLICATION_CREDENTIALS is missing in .env");
}

/**
 * Initialize Vertex AI client
 */
const vertexAI = new VertexAI({
  project: process.env.PROJECT_ID,
  location: process.env.LOCATION || "us-central1",
});

/**
 * Gemini multimodal model
 */
const model = vertexAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.3,
    maxOutputTokens: 1024,
  },
});

/**
 * Call Gemini with image + text
 */
export async function callGemini({ imageUri, userText }) {
  try {
    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
${SYSTEM_PROMPT}

USER SYMPTOMS:
${userText}

Always include:
"This is not a medical diagnosis."
`,
            },
            {
              fileData: {
                fileUri: imageUri,
                mimeType: "image/jpeg",
              },
            },
          ],
        },
      ],
    });

    console.log("Gemini raw:", JSON.stringify(response, null, 2));

    let text = "No response generated.";

    if (response?.response?.candidates?.length > 0) {
      text = response.response.candidates[0].content.parts[0].text;
    } else if (response?.candidates?.length > 0) {
      text = response.candidates[0].content.parts[0].text;
    }

    return { success: true, output: text };

  } catch (error) {
    console.error("❌ Gemini Error:", error);
    return { success: false, error: "Failed to generate AI response" };
  }
}
