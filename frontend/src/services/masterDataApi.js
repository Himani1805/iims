import api from "./api";

export async function getMasterData(type) {
  const { data } = await api.get("/master-data", {
    params: type ? { type } : undefined,
  });
  return data.items || {};
}

export async function createMasterData(payload) {
  const { data } = await api.post("/master-data", payload);
  return data.item;
}

export async function updateMasterData(id, payload) {
  const { data } = await api.put(`/master-data/${id}`, payload);
  return data.item;
}

export async function deleteMasterData(id) {
  await api.delete(`/master-data/${id}`);
}
