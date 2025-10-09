import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@edu.local");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    const r = login({ email, password, role: "admin" });
    if (!r.ok) { setErr(r.message); return; }
    nav("/admin");
  }

  return (
    <div className="login-wrapper">
      <div className="duo-card">
        <h3 className="h2">Admin login</h3>
        <form onSubmit={submit}>
          <label className="small">Email</label>
          <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} />

          <label className="small">Password</label>
          <input className="input" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />

          {err && <div style={{ color: "crimson" }}>{err}</div>}

          <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
            <button className="btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}
