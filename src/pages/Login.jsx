import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png"; // ensure logo is in src/assets/

export default function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showRegister, setShowRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegisterChange = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === "admin@orthodox.com" && form.password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid admin credentials!");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert(
      `Admin registered: ${registerForm.fullname} (${registerForm.email})`
    );
    setShowRegister(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-yellow-100 to-yellow-300 overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-6 py-4 bg-yellow-200 shadow-lg z-50"
      >
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-xl md:text-2xl font-bold text-yellow-700">
            Orthodox Admin Panel
          </h1>
        </div>
        <div className="space-x-3">
          <button
            onClick={() => setShowRegister(false)}
            className={`px-4 py-2 rounded-lg ${
              !showRegister
                ? "bg-yellow-500 text-white"
                : "bg-white border border-yellow-500 text-yellow-700"
            } hover:bg-yellow-400 transition`}
          >
            Login
          </button>
          <button
            onClick={() => setShowRegister(true)}
            className={`px-4 py-2 rounded-lg ${
              showRegister
                ? "bg-yellow-500 text-white"
                : "bg-white border border-yellow-500 text-yellow-700"
            } hover:bg-yellow-400 transition`}
          >
            Register
          </button>
        </div>
      </motion.nav>

      {/* Center Content */}
      <div className="flex flex-1 justify-center items-center px-4 py-10 md:py-20 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-yellow-300"
        >
          {showRegister ? (
            <>
              <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
                Admin Register
              </h2>
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={registerForm.fullname}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-yellow-500 bg-yellow-50/70"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-yellow-500 bg-yellow-50/70"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-yellow-500 bg-yellow-50/70"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-400 transition"
                >
                  Register
                </motion.button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
                Admin Login
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-yellow-500 bg-yellow-50/70"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-yellow-500 bg-yellow-50/70"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-400 transition"
                >
                  Login
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
