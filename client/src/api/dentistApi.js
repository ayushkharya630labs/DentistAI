import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export async function startConsult(file, text) {
  const form = new FormData();
  form.append("action", "start");
  form.append("image", file);
  form.append("text", text);

  const res = await axios.post(`${API_BASE}/consult`, form);
  return res.data;
}

export async function continueConsult(sessionId, text) {
  const res = await axios.post(`${API_BASE}/consult`, {
    action: "chat",
    sessionId,
    text,
  });

  return res.data;
}

export async function closeConsult(sessionId) {
  return axios.post(`${API_BASE}/consult`, {
    action: "close",
    sessionId,
  });
}
