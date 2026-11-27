import api from "./api";

export async function getRecordsSummary() {
  const { data } = await api.get("/records");
  return data;
}

export async function listRecords(moduleKey, { page = 1, limit = 20, q = "" } = {}) {
  const { data } = await api.get(`/records/${moduleKey}`, {
    params: { page, limit, q: q || undefined },
  });
  return {
    records: data.records || [],
    total: data.total || 0,
    page: data.page || page,
    pages: data.pages || 1,
    limit: data.limit || limit,
  };
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
