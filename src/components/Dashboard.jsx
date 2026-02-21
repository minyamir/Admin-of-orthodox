import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiFileText, FiActivity, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const StatCard = ({ icon: Icon, title, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
  >
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
      <Icon className="text-white text-2xl" />
    </div>
    <p className="text-gray-400 text-xs font-black uppercase tracking-[0.15em] mb-1">{title}</p>
    <h3 className="text-3xl font-black text-gray-900">{value}</h3>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12 font-sans selection:bg-yellow-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-2">
               <span className="h-1 w-10 bg-yellow-500 rounded-full"></span>
               <span className="text-yellow-600 font-bold text-sm uppercase tracking-widest">Admin Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Dashboard <span className="text-yellow-500 italic">Overview</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg font-medium">Welcome back. Here is the pulse of your platform.</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#000" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-gray-400 transition-all"
          >
            Create New Post <FiArrowRight className="text-yellow-400" />
          </motion.button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <StatCard icon={FiUsers} title="Total Students" value="1,248" color="bg-indigo-600" delay={0.1} />
          <StatCard icon={FiFileText} title="Active Posts" value="84" color="bg-yellow-500" delay={0.2} />
          <StatCard icon={FiActivity} title="Avg. Engagement" value="24.5%" color="bg-emerald-500" delay={0.3} />
        </div>

        {/* Platform Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/30 relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold mb-3">
                <FiCheckCircle />
                <span className="uppercase tracking-widest text-xs">System Status: Optimal</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Platform Insights</h3>
              <p className="text-gray-500 max-w-lg leading-relaxed text-lg">
                Your community is growing! You have <span className="text-yellow-600 font-bold underline decoration-2 underline-offset-4">3 pending student verifications</span> that need your signature move.
              </p>
            </div>
            
            <button className="bg-yellow-50 border-2 border-yellow-200 text-yellow-700 px-6 py-3 rounded-xl font-black hover:bg-yellow-500 hover:text-white transition-all whitespace-nowrap">
                Review Approvals
            </button>
          </div>
          
          {/* Subtle Decorative Gradient */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-yellow-100/50 rounded-full blur-[100px]" />
        </motion.div>
      </div>
    </div>
  );
}