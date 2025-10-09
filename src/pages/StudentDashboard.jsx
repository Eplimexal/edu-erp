import React from "react";
import { useAuth } from "../context/AuthContext";

export default function StudentDashboard() {
  const { api, user } = useAuth();

  // compute simple stats
  const myCourses = api.courses.filter((c) => true); // all courses for demo
  const myAssignments = api.assignments.filter((a) => a.courseId && true);
  const myAttendance = api.attendance.filter((a) => a.studentId === user.id);

  return (
    <div>
      <div className="card">
        <h3 className="h2">Welcome back</h3>
        <p className="small">Here's a summary of the system</p>
        <p className="small">Signed in as <strong>{user.name}</strong></p>
      </div>

      <div className="card">
        <h4 className="h2">My Courses</h4>
        <ul>
          {myCourses.map((c) => <li key={c.id}>{c.title} — {c.semester}</li>)}
        </ul>
      </div>

      <div className="card">
        <h4 className="h2">Assignments</h4>
        <ul>
          {myAssignments.map(a => <li key={a.id}>{a.title} — due {a.due}</li>)}
        </ul>
      </div>

      <div className="card">
        <h4 className="h2">Attendance</h4>
        <ul>
          {myAttendance.map(at => <li key={at.id}>{at.courseId} — {at.date} — {at.present ? "Present" : "Absent"}</li>)}
        </ul>
      </div>
    </div>
  );
}
