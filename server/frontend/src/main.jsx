import React from "react";
import { createRoot } from "react-dom/client";
import Register from "./components/Register/Register.jsx";
import "./components/Register/Register.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Register />
  </React.StrictMode>
);
