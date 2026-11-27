import api from "./api";

export async function listUsers() {
  const { data } = await api.get("/auth/users");
  return data.users || [];
}

export async function updateUserRole(id, role) {
  const { data } = await api.patch(`/auth/users/${id}/role`, { role });
  return data.user;
}
