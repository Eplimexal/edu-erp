import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { theme, mode, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="header">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input className="input search" placeholder="Search students, teachers, courses..." />
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ textAlign: "right", fontSize: 13, color: "var(--muted-2)" }}>
          Theme: <strong style={{ display: "block" }}>{mode} ({theme})</strong>
        </div>

        <div onClick={toggleTheme} role="button" aria-label="Toggle theme" style={{
          width: 56, height: 28, borderRadius: 28, padding: 4, display: "flex", alignItems: "center",
          background: theme === "dark" ? "linear-gradient(90deg,#4b65ff,#8b6bff)" : "linear-gradient(90deg,#fff,#eee)",
          cursor: "pointer"
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: 20,
            background: theme === "dark" ? "#111827" : "#fff",
            transform: theme === "dark" ? "translateX(28px)" : "translateX(0)",
            transition: "transform 190ms cubic-bezier(.2,.9,.2,1)"
          }}></div>
        </div>

        <div style={{ color: "var(--muted-1)" }}>{user ? user.name : "Guest"}</div>
      </div>
    </div>
  );
}
