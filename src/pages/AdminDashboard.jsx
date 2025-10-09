import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { api } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  function addUser(e) {
    e.preventDefault();
    const id = "u" + Math.random().toString(36).slice(2, 8);
    const newUser = { id, name, email, password: "changeme", role };
    api.setDb({ ...api.db, users: [...api.db.users, newUser] });
    setName(""); setEmail("");
  }

  return (
    <div>
      <div className="card">
        <h3 className="h2">Admin Dashboard</h3>
        <p className="small">Manage users and courses.</p>
      </div>

      <div className="card">
        <h4 className="h2">Add user</h4>
        <form onSubmit={addUser}>
          <input className="input" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <div style={{ margin: "8px 0" }}>
            <label><input type="radio" checked={role==="student"} onChange={()=>setRole("student")} /> Student</label>
            <label style={{ marginLeft: 12 }}><input type="radio" checked={role==="teacher"} onChange={()=>setRole("teacher")} /> Teacher</label>
            <label style={{ marginLeft: 12 }}><input type="radio" checked={role==="admin"} onChange={()=>setRole("admin")} /> Admin</label>
          </div>
          <div style={{ display:"flex", justifyContent: "flex-end" }}>
            <button className="btn" type="submit">Add user</button>
          </div>
        </form>
      </div>

      <div className="card">
        <h4 className="h2">Users</h4>
        <ul>
          {api.users.map(u => <li key={u.id}>{u.name} — {u.email} — {u.role}</li>)}
        </ul>
      </div>
    </div>
  );
}
