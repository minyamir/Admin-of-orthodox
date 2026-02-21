import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import PostForm from "../components/PostForm";
import StudentTable from "../components/StudentTable";
import PostTable from "../components/PostTable";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import CourseManagement from "../pages/CourseManagement";
import QuizManagement from "./QuizManagement";
import StudentResults from "./StudentResults";


export default function Home({ setIsLoggedIn }) {
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* 🌟 Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center bg-yellow-500 text-white px-4 py-3 shadow-md">
        <h1 className="text-lg font-bold tracking-wide">Admin Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-yellow-600 hover:bg-yellow-700 active:scale-95 transition-all"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* 🌟 Sidebar (desktop + mobile overlay) */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-40 md:z-0 ${
              isSidebarOpen ? "block" : "hidden md:block"
            }`}
          >
            <Sidebar
              setActiveView={(view) => {
                setActiveView(view);
                setIsSidebarOpen(false); // auto-close on mobile
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop navbar only */}
        <div className="hidden md:block">
          <Navbar setIsLoggedIn={setIsLoggedIn} />
        </div>

        {/* Content */}
        <main className="p-4 md:p-6 overflow-y-auto flex-1">
          {activeView === "dashboard" && <Dashboard />}
          {activeView === "addPost" && <PostForm />}
          {activeView === "students" && <StudentTable />}
          {activeView === "posts" && <PostTable />}
          {activeView === "courses" && <CourseManagement />}
          {activeView === "quizzes" && <QuizManagement />}
          {activeView === "results" && <StudentResults />}
        </main>
      </div>

      {/* 🌟 Overlay when sidebar is open (mobile only) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        ></div>
      )}
    </div>
  );
}
