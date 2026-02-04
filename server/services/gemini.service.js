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
export async function callGemini({ imageUri, history, userText }) {
  try {
    const contents = [
      {
        role: "user",
        parts: [
          { text: SYSTEM_PROMPT },
          {
            fileData: {
              fileUri: imageUri,
              mimeType: "image/jpeg",
            },
          },
        ],
      },
      ...history,
      {
        role: "user",
        parts: [{ text: userText }],
      },
    ];

    const response = await model.generateContent({ contents });

    const text =
      response?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    return { success: true, output: text };

  } catch (error) {
    console.error("Gemini error:", error);
    return { success: false, error: "Gemini failed" };
  }
}
