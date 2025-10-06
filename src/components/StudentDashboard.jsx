import React, { useState } from 'react';
import { Calendar, BookOpen, ClipboardList, BarChart3, Clock, FileText, ArrowLeft, Upload, CheckCircle, LogOut } from 'lucide-react';
import { GraduationCap } from 'lucide-react';

const StudentDashboard = ({ onLogout, userData }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const studentData = {
    name: userData?.name || "Alex Johnson",
    id: "STU2024001",
    courses: [
      { code: "CS101", name: "Introduction to Programming", credits: 4, color: "from-blue-500 to-cyan-500" },
      { code: "MATH201", name: "Calculus II", credits: 3, color: "from-purple-500 to-pink-500" },
      { code: "ENG102", name: "Technical Writing", credits: 2, color: "from-green-500 to-teal-500" },
      { code: "PHY101", name: "Physics I", credits: 4, color: "from-orange-500 to-red-500" }
    ],
    assignments: [
      {
        course: "CS101",
        courseName: "Introduction to Programming",
        color: "from-blue-500 to-cyan-500",
        tasks: [
          { id: 1, title: "Implement Sorting Algorithms", dueDate: "Oct 15, 2025", status: "pending", description: "Write code for bubble sort, merge sort, and quick sort" },
          { id: 2, title: "Create a Calculator App", dueDate: "Oct 20, 2025", status: "pending", description: "Build a basic calculator using HTML, CSS, and JavaScript" }
        ]
      },
      {
        course: "MATH201",
        courseName: "Calculus II",
        color: "from-purple-500 to-pink-500",
        tasks: [
          { id: 3, title: "Integration Problems Set", dueDate: "Oct 12, 2025", status: "submitted", description: "Solve problems 1-20 from Chapter 5" },
          { id: 4, title: "Series Convergence Analysis", dueDate: "Oct 18, 2025", status: "pending", description: "Analyze convergence for given series" }
        ]
      },
      {
        course: "ENG102",
        courseName: "Technical Writing",
        color: "from-green-500 to-teal-500",
        tasks: [
          { id: 5, title: "Research Paper Draft", dueDate: "Oct 25, 2025", status: "pending", description: "Submit first draft of your technical research paper" }
        ]
      },
      {
        course: "PHY101",
        courseName: "Physics I",
        color: "from-orange-500 to-red-500",
        tasks: [
          { id: 6, title: "Newton's Laws Lab Report", dueDate: "Oct 10, 2025", status: "submitted", description: "Complete lab report on Newton's laws experiment" },
          { id: 7, title: "Motion Problems Worksheet", dueDate: "Oct 16, 2025", status: "pending", description: "Solve worksheet on projectile motion" }
        ]
      }
    ],
    grades: [
      { course: "CS101", grade: "A", points: 4.0 },
      { course: "MATH201", grade: "B+", points: 3.3 },
      { course: "ENG102", grade: "A-", points: 3.7 },
      { course: "PHY101", grade: "B", points: 3.0 }
    ],
    attendance: [
      { course: "CS101", present: 28, total: 30, percentage: 93 },
      { course: "MATH201", present: 25, total: 28, percentage: 89 },
      { course: "ENG102", present: 20, total: 20, percentage: 100 },
      { course: "PHY101", present: 26, total: 30, percentage: 87 }
    ],
    timetable: [
      { day: "Monday", time: "9:00 AM", course: "CS101", room: "A-301" },
      { day: "Monday", time: "2:00 PM", course: "MATH201", room: "B-205" },
      { day: "Wednesday", time: "10:00 AM", course: "ENG102", room: "C-101" },
      { day: "Friday", time: "11:00 AM", course: "PHY101", room: "D-402" }
    ]
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      alert(`File selected: ${file.name}`);
    }
  };

  const handleSubmitAssignment = () => {
    if (selectedFile) {
      alert(`Assignment submitted successfully with file: ${selectedFile.name}`);
      setSelectedFile(null);
    } else {
      alert('Please select a file first');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'grades', label: 'Grades', icon: ClipboardList },
    { id: 'attendance', label: 'Attendance', icon: Clock }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-72 bg-white shadow-xl border-r border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-xl rounded-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">University ERP</h2>
              <p className="text-xs text-white/80">Student Portal</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {studentData.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{studentData.name}</p>
              <p className="text-xs text-gray-500">{studentData.id}</p>
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
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105' 
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
            <p className="text-gray-500 mb-8">Here's what's happening with your courses</p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-all">
                <BookOpen className="w-8 h-8 mb-3 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Total Courses</p>
                <p className="text-4xl font-bold">{studentData.courses.length}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-all">
                <BarChart3 className="w-8 h-8 mb-3 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Average Grade</p>
                <p className="text-4xl font-bold">3.5</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-all">
                <ClipboardList className="w-8 h-8 mb-3 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Attendance</p>
                <p className="text-4xl font-bold">92%</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Classes</h2>
              <div className="space-y-4">
                {studentData.timetable.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all">
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">{item.course}</p>
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

        {activeTab === 'courses' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">My Courses</h1>
            <div className="grid grid-cols-2 gap-6">
              {studentData.courses.map((course, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${course.color} p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{course.name}</h3>
                      <p className="text-sm opacity-90">{course.code}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full">
                      <span className="font-bold">{course.credits} Credits</span>
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

        {activeTab === 'assignments' && !selectedCourse && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Assignments</h1>
            <div className="grid grid-cols-2 gap-6">
              {studentData.assignments.map((item, idx) => {
                const pendingCount = item.tasks.filter(t => t.status === 'pending').length;
                return (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedCourse(item)}
                    className={`bg-gradient-to-br ${item.color} p-8 rounded-2xl shadow-xl text-white cursor-pointer transform hover:scale-105 transition-all`}
                  >
                    <h3 className="text-2xl font-bold mb-2">{item.courseName}</h3>
                    <p className="text-sm opacity-90 mb-4">{item.course}</p>
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/20">
                      <div>
                        <p className="text-2xl font-bold">{item.tasks.length}</p>
                        <p className="text-sm opacity-90">Total Tasks</p>
                      </div>
                      {pendingCount > 0 && (
                        <div className="bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full">
                          <p className="font-bold">{pendingCount} Pending</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'assignments' && selectedCourse && (
          <div>
            <button 
              onClick={() => setSelectedCourse(null)}
              className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Subjects
            </button>
            
            <div className={`bg-gradient-to-r ${selectedCourse.color} p-8 rounded-2xl shadow-xl text-white mb-8`}>
              <h1 className="text-4xl font-bold mb-2">{selectedCourse.courseName}</h1>
              <p className="text-lg opacity-90">{selectedCourse.course}</p>
            </div>
            
            <div className="space-y-6">
              {selectedCourse.tasks.map((assignment) => (
                <div key={assignment.id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{assignment.title}</h3>
                      <p className="text-gray-600">{assignment.description}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      assignment.status === 'submitted' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {assignment.status === 'submitted' ? '✓ Submitted' : '⏳ Pending'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <p className="text-gray-600 font-medium">Due: {assignment.dueDate}</p>
                  </div>

                  {assignment.status === 'pending' && (
                    <div className="border-t pt-6 mt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <input
                          type="file"
                          id={`file-${assignment.id}`}
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <label
                          htmlFor={`file-${assignment.id}`}
                          className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:shadow-lg cursor-pointer font-medium flex items-center gap-2 transition-all"
                        >
                          <Upload className="w-4 h-4" />
                          Choose File
                        </label>
                        <span className="text-gray-500 font-medium">
                          {selectedFile ? selectedFile.name : 'No file chosen'}
                        </span>
                      </div>
                      <button
                        onClick={handleSubmitAssignment}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transition-all"
                      >
                        <Upload className="w-4 h-4" />
                        Upload & Submit
                      </button>
                    </div>
                  )}

                  {assignment.status === 'submitted' && (
                    <div className="border-t pt-6 mt-6">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <p className="font-semibold">Assignment submitted successfully</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timetable' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Class Timetable</h1>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Day</th>
                    <th className="px-6 py-4 text-left font-semibold">Time</th>
                    <th className="px-6 py-4 text-left font-semibold">Course</th>
                    <th className="px-6 py-4 text-left font-semibold">Room</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.timetable.map((item, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{item.day}</td>
                      <td className="px-6 py-4 text-gray-600">{item.time}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{item.course}</td>
                      <td className="px-6 py-4 text-indigo-600 font-medium">{item.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'grades' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">My Grades</h1>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Course</th>
                    <th className="px-6 py-4 text-left font-semibold">Grade</th>
                    <th className="px-6 py-4 text-left font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.grades.map((item, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{item.course}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold">
                          {item.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{item.points.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Attendance</h1>
            <div className="grid gap-6">
              {studentData.attendance.map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{item.course}</h3>
                    <span className={`text-3xl font-bold ${
                      item.percentage >= 90 ? 'text-green-600' : 
                      item.percentage >= 75 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {item.percentage}%
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 font-medium">
                    {item.present} / {item.total} classes attended
                  </p>
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-4 rounded-full transition-all ${
                        item.percentage >= 90 ? 'bg-gradient-to-r from-green-500 to-teal-500' : 
                        item.percentage >= 75 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
                        'bg-gradient-to-r from-red-500 to-pink-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
