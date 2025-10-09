import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [err, setErr] = useState("");
  const { register } = useAuth();
  const nav = useNavigate();

  function submit(e) {
    e.preventDefault();
    const r = register({ name, email, password, role });
    if (!r.ok) { setErr(r.message); return; }
    if (r.user.role === "student") nav("/student-dashboard");
    else if (r.user.role === "teacher") nav("/teacher-dashboard");
  }

  return (
    <div className="login-wrapper">
      <div className="duo-card">
        <h3 className="h2">Register</h3>
        <form onSubmit={submit}>
          <label className="small">Full name</label>
          <input className="input" value={name} onChange={(e)=>setName(e.target.value)} />

          <label className="small">Email</label>
          <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} />

          <label className="small">Password</label>
          <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} />

          <div style={{ margin: "10px 0" }}>
            <label style={{ marginRight: 8 }}><input type="radio" checked={role === "student"} onChange={() => setRole("student")} /> Student</label>
            <label style={{ marginLeft: 12 }}><input type="radio" checked={role === "teacher"} onChange={() => setRole("teacher")} /> Teacher</label>
          </div>

          {err && <div style={{ color: "crimson" }}>{err}</div>}
          <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
            <button className="btn" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
