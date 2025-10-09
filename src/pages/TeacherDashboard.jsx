import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function TeacherDashboard() {
  const { api, user } = useAuth();
  const myCourses = api.courses.filter(c => c.teacherId === user.id);
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState(myCourses[0] ? myCourses[0].id : "");

  function createAssignment(e) {
    e.preventDefault();
    const id = "a" + Math.random().toString(36).slice(2, 8);
    api.addAssignment({ id, courseId, title, due: new Date().toISOString().slice(0, 10), createdBy: user.id });
    setTitle("");
  }

  return (
    <div>
      <div className="card">
        <h3 className="h2">Teacher Dashboard</h3>
        <p className="small">Manage assignments, attendance and timetables.</p>
      </div>

      <div className="card">
        <h4 className="h2">Create Assignment</h4>
        <form onSubmit={createAssignment}>
          <select className="input" value={courseId} onChange={e=>setCourseId(e.target.value)}>
            {myCourses.map(c=> <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <input className="input" placeholder="Assignment title" value={title} onChange={e=>setTitle(e.target.value)} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn" type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
