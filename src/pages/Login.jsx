import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const res = login({ email, password, role });
    if (!res.ok) {
      setErr(res.message);
      return;
    }
    // redirect based on role
    if (res.user.role === "student") nav("/student-dashboard");
    else if (res.user.role === "teacher") nav("/teacher-dashboard");
    else nav("/");
  }

  return (
    <div className="login-wrapper">
      <div className="duo-card">
        <h3 className="h2">Sign in to Edu ERP</h3>

        <form onSubmit={submit}>
          <label className="small">Email</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label className="small">Password</label>
          <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div style={{ margin: "10px 0" }}>
            <label style={{ marginRight: 8 }}><input type="radio" checked={role === "student"} onChange={() => setRole("student")} /> Student</label>
            <label style={{ marginLeft: 12 }}><input type="radio" checked={role === "teacher"} onChange={() => setRole("teacher")} /> Teacher</label>
            <Link to="/admin-login" style={{ marginLeft: 16 }}>Admin login</Link>
          </div>

          {err && <div style={{ color: "crimson" }}>{err}</div>}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <Link to="/register" className="small">Register</Link>
            <button className="btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}
