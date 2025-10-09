import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Simple localStorage-backed mock DB structure:
 * - users: [{ id, name, email, password, role }]
 * - courses, assignments, attendance stored here as well
 *
 * This is intentionally simple for front-end development.
 */

const DB_KEY = "edu_erp_db_v1";
const AUTH_KEY = "edu_erp_auth";

function seed() {
  return {
    users: [
      { id: "admin-1", name: "Admin User", email: "admin@edu.local", password: "admin", role: "admin" },
      { id: "teacher-1", name: "Prof. Sharma", email: "teacher@edu.local", password: "teacher", role: "teacher" },
      { id: "student-1", name: "Rohan", email: "rohan@koganti.net", password: "student", role: "student" }
    ],
    courses: [
      { id: "csc101", title: "Intro to CS", semester: "2025 Spring", teacherId: "teacher-1" },
      { id: "mat101", title: "Calculus I", semester: "2025 Spring", teacherId: "teacher-1" }
    ],
    assignments: [
      { id: "a1", courseId: "csc101", title: "Assignment 1", due: "2025-05-10", createdBy: "teacher-1" }
    ],
    attendance: [
      // simple attendance entries
      { id: "att1", studentId: "student-1", courseId: "csc101", date: "2025-03-01", present: true }
    ],
  };
}

function readDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      const s = seed();
      localStorage.setItem(DB_KEY, JSON.stringify(s));
      return s;
    }
    return JSON.parse(raw);
  } catch (e) {
    const s = seed();
    localStorage.setItem(DB_KEY, JSON.stringify(s));
    return s;
  }
}

function writeDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [db, setDb] = useState(readDB);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => writeDB(db), [db]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      else localStorage.removeItem(AUTH_KEY);
    } catch {}
  }, [user]);

  // auth methods
  function findUserByEmail(email) {
    return db.users.find((u) => u.email === email);
  }

  function login({ email, password, role }) {
    const u = db.users.find((x) => x.email === email && x.password === password && (role ? x.role === role : true));
    if (!u) return { ok: false, message: "Invalid credentials" };
    setUser(u);
    return { ok: true, user: u };
  }

  function register({ name, email, password, role }) {
    if (db.users.find((x) => x.email === email)) return { ok: false, message: "Email exists" };
    const id = (role || "student").substr(0, 3) + "-" + Math.random().toString(36).slice(2, 9);
    const newU = { id, name, email, password, role };
    const newDb = { ...db, users: [...db.users, newU] };
    setDb(newDb);
    setUser(newU);
    return { ok: true, user: newU };
  }

  function logout() {
    setUser(null);
  }

  // crud helpers for admin / teacher
  function addCourse(course) {
    const newDb = { ...db, courses: [...db.courses, course] };
    setDb(newDb);
  }

  function addAssignment(a) {
    const newDb = { ...db, assignments: [...db.assignments, a] };
    setDb(newDb);
  }

  function markAttendance(entry) {
    const newDb = { ...db, attendance: [...db.attendance, entry] };
    setDb(newDb);
  }

  const api = {
    db, setDb,
    users: db.users,
    courses: db.courses,
    assignments: db.assignments,
    attendance: db.attendance,
    findUserByEmail,
    addCourse, addAssignment, markAttendance,
  };

  return <AuthContext.Provider value={{ user, setUser, login, register, logout, api }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
