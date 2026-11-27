import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { MasterDataProvider } from "./context/MasterDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <BrowserRouter>
      <AuthProvider>
        <MasterDataProvider>
          <App />
        </MasterDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
);
