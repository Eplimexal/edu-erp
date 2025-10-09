import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

function read(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }

export default function TeacherDashboard() {
  const { user } = useAuth();
  const email = user?.email;
  const [assignments, setAssignments] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    setAssignments(read('edu_erp_assignments'));
    setTimetable(read(`edu_erp_timetable_${email}`));
    setSubmissions(read('edu_erp_submissions'));
  }, [email]);

  function addAssignment() {
    const title = prompt('Assignment title');
    const course = prompt('Course');
    const due = prompt('Due date (YYYY-MM-DD)', new Date().toISOString().slice(0,10));
    if (title && course && due) {
      const list = read('edu_erp_assignments');
      list.unshift({ id: Date.now(), title, course, due, createdBy: email });
      localStorage.setItem('edu_erp_assignments', JSON.stringify(list));
      setAssignments(list);
    }
  }

  function addTimetable() {
    const course = prompt('Course');
    const day = prompt('Day (e.g. Mon 10:00)');
    const room = prompt('Room');
    if (course && day && room) {
      const key = `edu_erp_timetable_${email}`;
      const t = read(key);
      t.unshift({ id: Date.now(), course, day, room });
      localStorage.setItem(key, JSON.stringify(t));
      setTimetable(t);
    }
  }

  return (
    <div>
      <div style={{ display:'flex', gap:12, marginBottom:16 }}>
        <Card title="Your quick stats">
          <div>
            <div className="h2">{assignments.length}</div>
            <div className="kicker">Assignments created</div>
          </div>
        </Card>

        <Card title="Submissions">
          <div className="small muted">Recent submissions</div>
          <ul>
            {submissions.slice(0,5).map(s => <li key={s.id}>{s.studentEmail} → {s.content?.slice(0,40)}</li>)}
          </ul>
        </Card>
      </div>

      <Card title="Assignments">
        <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:8 }}>
          <button className="btn" onClick={addAssignment}>Add assignment</button>
        </div>
        <table className="table">
          <thead><tr><th>Title</th><th>Course</th><th>Due</th><th>By</th></tr></thead>
          <tbody>
            {assignments.map(a => (
              <tr key={a.id}><td>{a.title}</td><td>{a.course}</td><td>{a.due}</td><td>{a.createdBy}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card title="Timetable">
        <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:8 }}>
          <button className="btn" onClick={addTimetable}>Add timetable entry</button>
        </div>
        {timetable.length === 0 ? <div className="small muted">No timetable entries</div> : (
          <table className="table"><thead><tr><th>Course</th><th>Day/time</th><th>Room</th></tr></thead>
            <tbody>{timetable.map(t => <tr key={t.id}><td>{t.course}</td><td>{t.day}</td><td>{t.room}</td></tr>)}</tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
