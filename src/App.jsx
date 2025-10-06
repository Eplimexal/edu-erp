// src/App.jsx
import React from "react";
import "./App.css";
import UniversityERP from "./pages/UniversityERP";

/**
 * App - top-level entry
 * We delegate everything to UniversityERP which contains the login/register/dashboard flow.
 * This keeps the app simple and avoids duplicating state across multiple places.
 */
export default function App() {
  return <UniversityERP />;
}
