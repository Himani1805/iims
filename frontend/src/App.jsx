import React from "react";
import Header from "./Components/Header/Header";
import AdminRoutes from "./Router/AdminRoutes/AdminRoutes";
import ComboBox from "./Components/ComboBox/ComboBox";
import Router from "./Router/Router";

export default function App() {
  return (
    <>
      <Header />
      <Router />
      {/* <AdminRoutes /> */}
    </>
  );
}
