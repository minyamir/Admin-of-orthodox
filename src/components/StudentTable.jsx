import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiSearch, FiCheck, FiX, FiMail, FiPhone, FiUser } from "react-icons/fi";

export default function StudentTable() {
  const [students, setStudents] = useState([
    { id: 1, name: "Mini 9", email: "mini9@example.com", department: "Computer Science", year: "3rd Year", phone: "0900000000" },
    { id: 2, name: "Yonas T.", email: "yonas@example.com", department: "Software Engineering", year: "2nd Year", phone: "0911111111" },
    { id: 3, name: "Abel M.", email: "abel@example.com", department: "Information Systems", year: "1st Year", phone: "0922222222" },
  ]);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (student) => {
    setEditId(student.id);
    setEditForm({ ...student });
  };

  const handleSave = () => {
    setStudents((prev) => prev.map((s) => (s.id === editId ? { ...editForm } : s)));
    setEditId(null);
  };

  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.phone.includes(searchTerm)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Student <span className="text-yellow-500 italic font-serif">Directory</span>
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Manage enrollments and student information</p>
        </div>

        <div className="relative group w-full md:w-80">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-600 transition-colors z-10" />
          <input
            type="text"
            placeholder="Search name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500/40 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-5 px-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Student</th>
                <th className="py-5 px-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Department & Year</th>
                <th className="py-5 px-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact</th>
                <th className="py-5 px-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredStudents.map((s, index) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="group hover:bg-yellow-50/30 transition-colors"
                  >
                    {/* Name Column */}
                    <td className="py-6 px-8">
                      {editId === s.id ? (
                        <input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full bg-gray-50 border border-yellow-200 rounded-lg px-3 py-1.5 text-sm font-bold outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-yellow-100 group-hover:text-yellow-600 transition-colors">
                            <FiUser size={18} />
                          </div>
                          <span className="font-bold text-gray-900">{s.name}</span>
                        </div>
                      )}
                    </td>

                    {/* Dept Column */}
                    <td className="py-6 px-6">
                      {editId === s.id ? (
                        <div className="flex gap-2">
                          <input
                            value={editForm.department}
                            onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                            className="w-full bg-gray-50 border border-yellow-200 rounded-lg px-3 py-1.5 text-xs outline-none"
                          />
                          <input
                            value={editForm.year}
                            onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                            className="w-24 bg-gray-50 border border-yellow-200 rounded-lg px-3 py-1.5 text-xs outline-none"
                          />
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-bold text-gray-800">{s.department}</p>
                          <p className="text-[10px] text-yellow-600 font-black uppercase tracking-widest">{s.year}</p>
                        </div>
                      )}
                    </td>

                    {/* Contact Column */}
                    <td className="py-6 px-6 text-sm text-gray-500">
                      {editId === s.id ? (
                        <div className="space-y-1">
                          <input
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="w-full bg-gray-50 border border-yellow-200 rounded-lg px-3 py-1.5 text-xs outline-none"
                          />
                          <input
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className="w-full bg-gray-50 border border-yellow-200 rounded-lg px-3 py-1.5 text-xs outline-none"
                          />
                        </div>
                      ) : (
                        <div className="space-y-1 font-medium">
                          <div className="flex items-center gap-2">
                            <FiMail className="text-gray-300" /> {s.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <FiPhone className="text-gray-300" /> {s.phone}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="py-6 px-6">
                      <div className="flex items-center justify-center gap-2">
                        {editId === s.id ? (
                          <>
                            <button onClick={handleSave} className="p-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-100 hover:scale-110 transition-transform">
                              <FiCheck size={16} />
                            </button>
                            <button onClick={() => setEditId(null)} className="p-2 bg-gray-100 text-gray-400 rounded-xl hover:bg-gray-200 transition-transform">
                              <FiX size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(s)} className="p-2.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all">
                              <FiEdit2 size={16} />
                            </button>
                            <button onClick={() => setStudents(students.filter(x => x.id !== s.id))} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                              <FiTrash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}