import { callGemini } from "../services/gemini.service.js";

/**
 * Main DentistAI Agent
 * Acts like the "root agent" conceptually
 */
export async function dentistAgent({ imageUri, history, userText }) {
  return await callGemini({
    imageUri,
    history,
    userText,
  });
}
