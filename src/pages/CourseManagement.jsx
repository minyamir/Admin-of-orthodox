import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBook, FiVideo, FiTrash2, FiPlus, FiFileText, FiUploadCloud } from "react-icons/fi";

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    video: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm({ ...form, video: file });
  };

  const handleAddCourse = () => {
    if (!form.title || !form.description || !form.video) {
      alert("Please fill all fields and upload a video!");
      return;
    }
    setCourses([...courses, { id: Date.now(), ...form }]);
    setForm({ title: "", description: "", video: null });
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      {/* HEADER SECTION */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          Course <span className="text-yellow-500 italic font-serif">Curriculum</span>
        </h2>
        <p className="text-gray-500 text-sm font-medium mt-1">Upload and manage educational video content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: ADD COURSE FORM */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-24">
            <h3 className="text-sm font-black uppercase tracking-[0.15em] text-gray-400 mb-6 flex items-center gap-2">
              <FiPlus className="text-yellow-500" /> New Course
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-1 block">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Intro to Theology"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500/40 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-1 block">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Brief overview..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500/40 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-1 block">Video Lesson</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-yellow-50/50 hover:border-yellow-200 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUploadCloud size={24} className="text-gray-300 mb-2" />
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      {form.video ? form.video.name : "Select MP4 File"}
                    </p>
                  </div>
                  <input type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
                </label>
              </div>

              <button
                onClick={handleAddCourse}
                className="w-full bg-gray-900 hover:bg-yellow-500 text-white hover:text-black font-black py-4 rounded-2xl transition-all shadow-lg shadow-gray-200 flex items-center justify-center gap-2 uppercase text-xs tracking-[0.1em]"
              >
                Publish Course
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: COURSE LIST */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-black text-gray-900 tracking-tight">Active Courses</h3>
              <span className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {courses.length} Lessons
              </span>
            </div>

            <div className="p-2">
              <AnimatePresence>
                {courses.length === 0 ? (
                  <div className="py-20 flex flex-col items-center opacity-30">
                    <FiBook size={48} className="mb-4" />
                    <p className="font-bold text-sm uppercase tracking-[0.2em]">No courses found</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {courses.map((course) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group flex items-center justify-between p-6 rounded-[2rem] hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 group-hover:scale-110 transition-transform">
                            <FiVideo size={24} />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 tracking-tight">{course.title}</h4>
                            <p className="text-gray-400 text-xs mt-1 max-w-xs line-clamp-1">{course.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                               <span className="flex items-center gap-1"><FiFileText /> {course.video.name}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDelete(course.id)}
                          className="p-4 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}