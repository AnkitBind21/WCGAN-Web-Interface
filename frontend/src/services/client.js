import axios from "axios";

const api = axios.create({
  baseURL: "https://wcgan-web-interface.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

export async function generateFace(gender, smile) {
  const { data } = await api.post("/generate", { gender, smile });
  return data;
}

export async function getHistory() {
  const { data } = await api.get("/history");
  return data;
}

export async function healthCheck() {
  const { data } = await api.get("/health");
  return data;
}