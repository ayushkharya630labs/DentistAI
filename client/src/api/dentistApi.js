import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export async function analyzeDentalImage(file, text) {
  const form = new FormData();
  form.append("image", file);
  form.append("text", text);

  const res = await axios.post(`${API_BASE}/analyze`, form);
  return res.data;
}
