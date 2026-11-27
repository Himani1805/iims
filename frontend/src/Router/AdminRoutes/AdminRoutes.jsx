import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../Pages/admin/AdminDashboard";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      {/* <Route path='/admin/dashboard' element={<Dashboard />}/> */}
    </Routes>
  );
}
