import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "../Pages/Welcome";
import Dashboard from "../Pages/admin/Dashboard";
import Test from "../Pages/test/Test";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/test" element={<Test />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
