import { callGemini } from "../services/gemini.service.js";

/**
 * Main DentistAI Agent
 * Acts like the "root agent" conceptually
 */
export async function dentistAgent({ imageUri, userText }) {
  return await callGemini({
    imageUri,
    userText,
  });
}
