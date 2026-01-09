import api from "./api";

export async function listPatients() {
  const res = await api.get("/patients");
  return res.data;
}
