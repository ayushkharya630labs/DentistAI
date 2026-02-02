/**
 * Medical safety guardrails
 * Ensures non-diagnostic and safe AI behavior
 */

export function enforceMedicalGuardrails(aiText) {
  if (!aiText) return aiText;

  let safeText = aiText;

  // Enforce disclaimer
  if (!safeText.toLowerCase().includes("not a medical diagnosis")) {
    safeText += "\n\n⚠️ This is not a medical diagnosis.";
  }

  // Soft blocking of risky words (extra safety)
  const bannedPatterns = [
    /you have/i,
    /you are suffering from/i,
    /diagnosed with/i,
    /treatment plan/i,
    /medication/i,
    /prescription/i,
  ];

  bannedPatterns.forEach((pattern) => {
    safeText = safeText.replace(pattern, "may be related to");
  });

  return safeText;
}
