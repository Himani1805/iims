import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "../Pages/Welcome";
import AdminDashboard from "../Pages/admin/AdminDashboard";
import UserDashboard from "../Pages/user/UserDashboard";

import Test from "../Pages/test/Test";
import Redirect from "../Pages/Redirect";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/test" element={<Test />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/dashboard/:name" element={<Redirect />} />
    </Routes>
  );
}
