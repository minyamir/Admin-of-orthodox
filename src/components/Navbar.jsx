import React from "react";
import { FiLogOut, FiSearch, FiBell, FiChevronDown, FiCommand } from "react-icons/fi";

export default function Navbar({ setIsLoggedIn }) {
  return (
    <nav className="flex items-center justify-between bg-[#F8FAFC]/60 backdrop-blur-xl px-8 py-5 sticky top-0 z-40 transition-all">
      
      {/* 1. SEARCH SECTION (Live Input) */}
      <div className="flex items-center gap-6 flex-1">
        <div className="relative group hidden lg:block w-full max-w-sm">
          {/* THE SEARCH ICON (Visual Indicator) */}
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400 group-focus-within:text-yellow-600 transition-colors" />
          </div>

          {/* THE SEARCH INPUT (This is where the user types) */}
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-12 py-2.5 text-sm focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500/50 transition-all outline-none shadow-sm"
          />

          {/* SHORTCUT HINT (Premium Detail) */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-1 px-1.5 py-1 bg-gray-100 rounded-md border border-gray-200">
             <FiCommand className="text-[10px] text-gray-400" />
             <span className="text-[10px] font-bold text-gray-400">K</span>
          </div>
        </div>
      </div>

      {/* 2. RIGHT ACTIONS */}
      <div className="flex items-center gap-5">
        <button className="relative group p-2.5 bg-white border border-gray-200 rounded-xl hover:border-yellow-500/50 hover:bg-yellow-50/30 transition-all shadow-sm">
          <FiBell size={20} className="text-gray-600 group-hover:text-yellow-600" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-yellow-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>

        <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-2"></div>

        <div className="flex items-center gap-4 pl-2">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-black text-gray-900 tracking-tight leading-none">Admin Alpha</p>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1.5 flex items-center justify-end gap-1">
               <span className="w-1 h-1 bg-emerald-500 rounded-full"></span> Online
            </p>
          </div>
          
          <button className="flex items-center gap-2 group">
            <div className="w-11 h-11 bg-gradient-to-tr from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center text-yellow-400 font-bold shadow-lg shadow-gray-200 group-hover:scale-105 transition-transform">
               A
            </div>
            <FiChevronDown className="text-gray-400 group-hover:text-gray-900 transition-colors" />
          </button>

          <button 
            onClick={() => setIsLoggedIn(false)}
            className="ml-2 p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Secure Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}