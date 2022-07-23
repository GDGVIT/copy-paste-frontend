import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
