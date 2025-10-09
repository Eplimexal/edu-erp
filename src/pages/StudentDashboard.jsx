import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

/*
  Student dashboard reads data from localStorage keys:
  - edu_erp_students (list of registered students)
  - edu_erp_attendance_{studentId} => [{ course, semester, classDate, present: true/false }]
  - edu_erp_assignments => list with ownerCourse etc.
  - edu_erp_submissions => list of {assignmentId, studentEmail, content, submittedAt}
  - edu_erp_courses_{studentEmail} => list of { courseId, name, completion }
  - edu_erp_events_{studentEmail} => calendar events
  For simplicity, we use the logged in user's email to index.
*/

function read(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const email = user?.email;
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!email) return;
    setAttendance(read(`edu_erp_attendance_${email}`));
    setAssignments(read('edu_erp_assignments'));
    setSubmissions(read('edu_erp_submissions'));
    setCourses(read(`edu_erp_courses_${email}`));
    setEvents(read(`edu_erp_events_${email}`));
  }, [email]);

  const summary = useMemo(() => {
    // counts
    const totalCourses = courses.length;
    const due = assignments.filter(a => !submissions.find(s => s.assignmentId === a.id && s.studentEmail === email) && new Date(a.due) >= new Date());
    const upcoming = assignments.filter(a => new Date(a.due) >= new Date()).slice(0, 5);
    return { totalCourses, dueCount: due.length, upcoming: upcoming.length };
  }, [courses, assignments, submissions, email]);

  // attendance per course (percentage)
  const attendanceByCourse = useMemo(() => {
    const map = {};
    attendance.forEach(a => {
      const k = `${a.course}||${a.semester}`;
      map[k] = map[k] || { course: a.course, semester: a.semester, total: 0, present: 0, perClass: [] };
      map[k].total += 1;
      if (a.present) map[k].present += 1;
      map[k].perClass.push({ date: a.classDate, present: a.present });
    });
    return Object.values(map).map(v => ({ ...v, pct: v.total ? Math.round((v.present / v.total) * 100) : 0 }));
  }, [attendance]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <Card title="Quick Stats">
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <div className="h2">{summary.totalCourses}</div>
              <div className="kicker">Courses</div>
            </div>
            <div>
              <div className="h2">{summary.dueCount}</div>
              <div className="kicker">Due assignments</div>
            </div>
            <div>
              <div className="h2">{summary.upcoming}</div>
              <div className="kicker">Upcoming</div>
            </div>
          </div>
        </Card>

        <Card title="Recent Activity">
          <ul>
            <li className="small">No recent system notifications.</li>
          </ul>
        </Card>
      </div>

      <Card title="Attendance by course">
        {attendanceByCourse.length === 0 ? (
          <div className="small muted">No attendance records yet.</div>
        ) : (
          <table className="table">
            <thead><tr><th>Course</th><th>Semester</th><th>Percent</th><th>View</th></tr></thead>
            <tbody>
              {attendanceByCourse.map(c => (
                <tr key={c.course + c.semester}>
                  <td>{c.course}</td>
                  <td>{c.semester}</td>
                  <td>{c.pct}%</td>
                  <td><Link to={`/student-dashboard?course=${encodeURIComponent(c.course)}&sem=${encodeURIComponent(c.semester)}`}>View classes</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card title="Assignments">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="kicker">Due / Upcoming / Submit</div>
        </div>

        <div style={{ marginTop: 12 }}>
          <h4 className="h2">Due assignments</h4>
          {assignments.filter(a => new Date(a.due) >= new Date()).length === 0 ? (
            <div className="small muted">No due assignments</div>
          ) : (
            assignments.filter(a => new Date(a.due) >= new Date()).map(a => (
              <div key={a.id} style={{ padding: 10, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><strong>{a.title}</strong> <div className="small kicker">{a.course} — due {new Date(a.due).toLocaleDateString()}</div></div>
                  <div>
                    <button className="btn" onClick={() => {
                      // open quick submit modal -> for simplicity prompt
                      const content = prompt('Submit content (text)');
                      if (content) {
                        const subs = read('edu_erp_submissions');
                        subs.unshift({ id: Date.now(), assignmentId: a.id, studentEmail: email, content, submittedAt: new Date().toISOString() });
                        localStorage.setItem('edu_erp_submissions', JSON.stringify(subs));
                        alert('Submitted (mock)');
                        window.location.reload();
                      }
                    }}>Submit</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Card title="Calendar / Events">
        {events.length === 0 ? <div className="small muted">No events</div> : (
          <ul>
            {events.map(ev => <li key={ev.id}>{ev.title} — {new Date(ev.when).toLocaleString()}</li>)}
          </ul>
        )}
      </Card>

      <Card title="Courses & Completion">
        {courses.length === 0 ? <div className="small muted">No courses yet</div> : (
          <table className="table"><thead><tr><th>Course</th><th>Completion</th></tr></thead><tbody>
            {courses.map(c => (
              <tr key={c.courseId}><td>{c.name}</td><td>{c.completion}%</td></tr>
            ))}
          </tbody></table>
        )}
      </Card>

      <Card title="Performance (Grades)">
        <div className="small muted">Grades are mock — integrate real data later.</div>
      </Card>
    </div>
  );
}
