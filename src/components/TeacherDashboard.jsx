import React, { useState } from 'react';
import { BarChart3, BookOpen, Users, Calendar, ClipboardList, FileText, LogOut, GraduationCap } from 'lucide-react';

const TeacherDashboard = ({ onLogout, userData }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const teacherData = {
    name: userData?.name || "Dr. Sarah Williams",
    id: "TCH2024050",
    modules: [
      { code: "CS101", name: "Introduction to Programming", students: 45, color: "from-blue-500 to-cyan-500" },
      { code: "CS201", name: "Data Structures", students: 38, color: "from-purple-500 to-pink-500" },
      { code: "CS301", name: "Algorithms", students: 32, color: "from-green-500 to-teal-500" }
    ],
    classes: [
      { day: "Monday", time: "9:00 AM", module: "CS101", room: "A-301" },
      { day: "Tuesday", time: "11:00 AM", module: "CS201", room: "A-305" },
      { day: "Thursday", time: "2:00 PM", module: "CS301", room: "B-201" }
    ],
    attendance: [
      { module: "CS101", class: "Lecture 15", present: 42, total: 45, date: "Oct 3" },
      { module: "CS201", class: "Lecture 12", present: 35, total: 38, date: "Oct 2" },
      { module: "CS301", class: "Lecture 10", present: 30, total: 32, date: "Oct 1" }
    ]
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'modules', label: 'Modules', icon: BookOpen },
    { id: 'classes', label: 'Classes', icon: Calendar },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'grading', label: 'Grading', icon: FileText }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-72 bg-white shadow-xl border-r border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-xl rounded-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">University ERP</h2>
              <p className="text-xs text-white/80">Teacher Portal</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              {teacherData.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{teacherData.name}</p>
              <p className="text-xs text-gray-500">{teacherData.id}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6">
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back! 👋</h1>
            <p className="text-gray-500 mb-8">Here's your teaching overview</p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-all">
                <BookOpen className="w-8 h-8 mb-3 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Total Modules</p>
                <p className="text-4xl font-bold">{teacherData.modules.length}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-all">
                <Users className="w-8 h-8 mb-3 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Total Students</p>
                <p className="text-4xl font-bold">115</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-all">
                <Calendar className="w-8 h-8 mb-3 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Classes This Week</p>
                <p className="text-4xl font-bold">3</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Classes</h2>
              <div className="space-y-4">
                {teacherData.classes.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all">
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">{item.module}</p>
                      <p className="text-sm text-gray-500">{item.day} • {item.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-indigo-600">{item.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">My Modules</h1>
            <div className="grid grid-cols-2 gap-6">
              {teacherData.modules.map((module, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${module.color} p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{module.name}</h3>
                      <p className="text-sm opacity-90">{module.code}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full">
                      <span className="font-bold">{module.students} Students</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <button className="text-sm font-medium hover:underline">View Details →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Class Schedule</h1>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Day</th>
                    <th className="px-6 py-4 text-left font-semibold">Time</th>
                    <th className="px-6 py-4 text-left font-semibold">Module</th>
                    <th className="px-6 py-4 text-left font-semibold">Room</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherData.classes.map((item, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{item.day}</td>
                      <td className="px-6 py-4 text-gray-600">{item.time}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{item.module}</td>
                      <td className="px-6 py-4 text-indigo-600 font-medium">{item.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Recent Attendance</h1>
            <div className="grid gap-6">
              {teacherData.attendance.map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{item.module}</h3>
                      <p className="text-gray-500">{item.class} • {item.date}</p>
                    </div>
                    <span className="text-3xl font-bold text-indigo-600">
                      {item.present} / {item.total}
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all"
                      style={{ width: `${(item.present / item.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'grading' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Grading</h1>
            <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-200 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Select a module to view and grade assignments</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
