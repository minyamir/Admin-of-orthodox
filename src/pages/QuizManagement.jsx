import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiEdit3, 
  FiTrash2, 
  FiPlus, 
  FiCheckCircle, 
  FiHelpCircle, 
  FiBookOpen, 
  FiInfo,
  FiTarget,
  FiZap
} from "react-icons/fi";

export default function QuizManagement() {
  const [quizzes, setQuizzes] = useState([]);
  const [form, setForm] = useState({
    course: "",
    question: "",
    options: ["", "", "", ""],
    correctIndex: 0,
    explanation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const options = [...form.options];
    options[index] = value;
    setForm({ ...form, options });
  };

  const handleAddQuiz = () => {
    if (!form.course || !form.question || !form.explanation) return;
    setQuizzes([{ ...form, id: Date.now() }, ...quizzes]);
    setForm({
      course: "",
      question: "",
      options: ["", "", "", ""],
      correctIndex: 0,
      explanation: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 md:p-8 bg-[#F8F9FA] text-slate-900"
    >
      {/* HEADER HERO SECTION */}
      <div className="relative mb-12 overflow-hidden bg-gray-900 rounded-[3rem] p-10 shadow-2xl shadow-yellow-500/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 bg-yellow-500 rounded-lg text-black"><FiZap size={18}/></span>
              <span className="text-yellow-500 font-black text-xs uppercase tracking-widest">Admin Control</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              Quiz <span className="text-yellow-500 italic">Studio</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-md font-medium">Design engaging assessments and manage your knowledge base in one sleek interface.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex gap-8">
            <div className="text-center">
              <p className="text-3xl font-black text-white">{quizzes.length}</p>
              <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Total Questions</p>
            </div>
            <div className="w-px h-10 bg-white/10 my-auto" />
            <div className="text-center">
              <p className="text-3xl font-black text-yellow-500">Live</p>
              <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Status</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: THE CREATOR CARD */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                <FiEdit3 size={20} />
              </div>
              <h3 className="font-black text-xl tracking-tight text-gray-800">Draft Question</h3>
            </div>
            
            <div className="space-y-6">
              <div className="group">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 mb-2 block tracking-widest group-focus-within:text-yellow-500 transition-colors">Course Attachment</label>
                <div className="relative">
                    <FiTarget className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input
                    type="text"
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    placeholder="Enter course name..."
                    className="w-full pl-11 pr-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500/40 outline-none transition-all font-bold"
                    />
                </div>
              </div>

              <div className="group">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 mb-2 block tracking-widest group-focus-within:text-yellow-500 transition-colors">Question Text</label>
                <textarea
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  placeholder="What would you like to ask?"
                  rows={3}
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500/40 outline-none transition-all resize-none font-medium leading-relaxed"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest block">Answer Options (Select the correct one)</label>
                {form.options.map((opt, idx) => (
                  <div key={idx} className="relative group/opt">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      className={`w-full pl-5 pr-14 py-4 rounded-2xl text-sm outline-none transition-all border-2 ${
                        form.correctIndex === idx 
                        ? "bg-emerald-50 border-emerald-500/30 ring-4 ring-emerald-500/5 text-emerald-900" 
                        : "bg-gray-50 border-transparent hover:border-gray-200"
                      }`}
                    />
                    <button 
                      onClick={() => setForm({...form, correctIndex: idx})}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                        form.correctIndex === idx ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" : "text-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      <FiCheckCircle size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 mb-2 block tracking-widest">Logic & Feedback</label>
                <textarea
                  name="explanation"
                  value={form.explanation}
                  onChange={handleChange}
                  placeholder="Explain why the answer is correct..."
                  rows={2}
                  className="w-full px-5 py-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-xs text-blue-900 focus:bg-white focus:border-blue-300 outline-none transition-all resize-none italic"
                />
              </div>

              <button
                onClick={handleAddQuiz}
                className="w-full bg-gray-900 hover:bg-yellow-500 text-white hover:text-black font-black py-5 rounded-3xl transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em]"
              >
                <FiPlus size={18} /> Add to Question Bank
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: THE KNOWLEDGE BASE */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6 px-4">
            <h3 className="font-black text-2xl tracking-tight flex items-center gap-3">
               <FiBookOpen className="text-yellow-600" /> Question Bank
            </h3>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {quizzes.length === 0 ? (
                <div className="py-40 bg-white rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
                  <FiHelpCircle size={60} strokeWidth={1} className="mb-4 text-gray-200" />
                  <p className="font-black uppercase tracking-widest text-sm">No Questions Yet</p>
                </div>
              ) : (
                quizzes.map((q) => (
                  <motion.div
                    key={q.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16" />
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <span className="px-4 py-1.5 bg-gray-900 text-yellow-500 text-[10px] font-black rounded-full uppercase tracking-[0.2em]">
                                {q.course}
                            </span>
                            <button
                                onClick={() => setQuizzes(quizzes.filter(x => x.id !== q.id))}
                                className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                            >
                                <FiTrash2 size={18} />
                            </button>
                        </div>

                        <h4 className="text-xl font-black text-gray-800 leading-snug mb-6 pr-10">
                            {q.question}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                            {q.options.map((o, idx) => (
                                <div 
                                    key={idx}
                                    className={`px-5 py-4 rounded-2xl text-xs flex items-center justify-between font-bold ${
                                        idx === q.correctIndex 
                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" 
                                        : "bg-gray-50 text-gray-500 border border-gray-100"
                                    }`}
                                >
                                    <span>{o}</span>
                                    {idx === q.correctIndex && <FiCheckCircle />}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-start gap-3 bg-blue-50/50 p-5 rounded-[1.5rem] border border-blue-50">
                            <FiInfo className="text-blue-500 mt-1 shrink-0" size={16} />
                            <p className="text-xs text-blue-800 leading-relaxed font-medium">
                                <span className="font-black uppercase tracking-tighter mr-2">Explanation:</span>
                                {q.explanation}
                            </p>
                        </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.div>
  );
}