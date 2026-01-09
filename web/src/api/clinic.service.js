import api from "./api";

export async function getClinic() {
  const res = await api.get("/clinic");
  return res.data;
}

export async function updateClinic(data) {
  const res = await api.put("/clinic", data);
  return res.data;
}
