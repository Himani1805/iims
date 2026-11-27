import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Redirect from "../Pages/Redirect";
import Signup from "../Pages/Signup";
import AdminDashboard from "../Pages/admin/AdminDashboard";
import MasterDataAdmin from "../Pages/admin/MasterDataAdmin";
import Users from "../Pages/admin/Users";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute adminOnly>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/master-data"
        element={
          <ProtectedRoute adminOnly>
            <MasterDataAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard/:name"
        element={
          <ProtectedRoute adminOnly>
            <Redirect />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}
