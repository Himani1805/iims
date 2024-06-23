import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "../Pages/Welcome";
import Dashboard from "../Pages/admin/Dashboard";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
