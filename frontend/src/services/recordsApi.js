import api from "./api";

export async function listRecords(moduleKey) {
  const { data } = await api.get(`/records/${moduleKey}`);
  return data.records || [];
}

export async function createRecord(moduleKey, payload) {
  const { data } = await api.post(`/records/${moduleKey}`, payload);
  return data.record;
}

export async function updateRecord(moduleKey, id, payload) {
  const { data } = await api.put(`/records/${moduleKey}/${id}`, payload);
  return data.record;
}

export async function deleteRecord(moduleKey, id) {
  await api.delete(`/records/${moduleKey}/${id}`);
}
