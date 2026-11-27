import dotenv from "dotenv";

dotenv.config();

const BASE = `http://127.0.0.1:${process.env.PORT || 5050}/api`;

async function req(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${options.method || "GET"} ${path} -> ${res.status} ${data.message || ""}`);
  }
  return data;
}

async function run() {
  const health = await req("/health");
  if (!health.ok) throw new Error("Health check failed");

  const login = await req("/auth/login", {
    method: "POST",
    body: { email: "himani@hsacademic.com", password: "admin123" },
  });
  if (!login.token) throw new Error("Login did not return token");

  const summary = await req("/records", { token: login.token });
  const master = await req("/master-data", { token: login.token });
  const users = await req("/auth/users", { token: login.token });
  const paged = await req("/records/TimeTable?page=1&limit=5&q=MBA", {
    token: login.token,
  });

  console.log("API smoke test passed");
  console.log({
    health: health.ok,
    recordsTotal: summary.total,
    masterTypes: Object.keys(master.items || {}).length,
    users: (users.users || []).length,
    pagedTotal: paged.total,
    page: paged.page,
  });
}

run().catch((error) => {
  console.error("API smoke test failed:", error.message);
  process.exit(1);
});
