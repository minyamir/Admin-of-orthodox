import React from "react";
import { 
  FiHome, 
  FiPlusSquare, 
  FiUsers, 
  FiGrid, 
  FiBookOpen, 
  FiEdit3, 
  FiPieChart,
  FiLogOut 
} from "react-icons/fi"; // Uses the same library as your dashboard
import orthodox from "../assets/orthodox.png";

// Helper Component for Nav Items
const NavItem = ({ icon: Icon, label, id, onClick, activeView }) => {
  const isActive = activeView === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
        isActive 
          ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20" 
          : "text-gray-400 hover:bg-white/5 hover:text-yellow-400"
      }`}
    >
      <Icon className={`text-xl ${isActive ? "text-black" : "group-hover:scale-110 transition-transform"}`} />
      <span className={`font-bold text-sm tracking-wide ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}>
        {label}
      </span>
    </button>
  );
};

export default function Sidebar({ setActiveView, activeView }) {
  const menuItems = [
    { id: "dashboard", label: "Home", icon: FiHome },
    { id: "addPost", label: "Add Post/Event", icon: FiPlusSquare },
    { id: "students", label: "View Students", icon: FiUsers },
    { id: "posts", label: "View Posts", icon: FiGrid },
    { id: "courses", label: "Courses", icon: FiBookOpen },
    { id: "quizzes", label: "Quizzes", icon: FiEdit3 },
    { id: "results", label: "Quiz Results", icon: FiPieChart },
  ];

  return (
    <div className="w-72 bg-[#0F1115] flex flex-col p-6 h-screen sticky top-0 border-r border-white/5 shadow-2xl">
      {/* BRANDING */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
          <span className="text-black font-black text-xl">O</span>
        </div>
        <div>
          <h2 className="text-white font-black text-lg leading-none tracking-tighter">ORTHODOX</h2>
          <span className="text-yellow-500 text-[10px] uppercase font-bold tracking-[0.2em]">Admin Panel</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-2">
        {menuItems.map((item) => (
          <NavItem 
            key={item.id}
            {...item}
            onClick={setActiveView}
            activeView={activeView}
          />
        ))}
      </div>

      {/* FOOTER SECTION */}
      <div className="mt-auto pt-6">
        <div className="bg-gradient-to-b from-transparent to-white/5 rounded-3xl p-6 border border-white/5 flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-yellow-500 rounded-full blur opacity-20 group-hover:opacity-40 transition"></div>
            <img
              src={orthodox}
              alt="Orthodox Symbol"
              className="relative w-20 h-20 object-contain rounded-full border border-yellow-500/50 p-1 bg-black"
            />
          </div>
          <p className="mt-3 text-white font-bold text-xs">System Administrator</p>
          <button className="mt-4 flex items-center gap-2 text-gray-500 hover:text-red-400 text-xs font-bold transition-colors">
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}