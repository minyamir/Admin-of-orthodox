// src/pages/StudentResults.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function StudentResults() {
  const [results, setResults] = useState([
    { id: 1, student: "Mini 9", course: "Intro to Faith", score: 80 },
    { id: 2, student: "Yonas T.", course: "Bible Study", score: 95 },
    { id: 3, student: "Abel M.", course: "Spiritual Practices", score: 70 },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white/90 backdrop-blur-md border border-yellow-400 rounded-2xl shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-yellow-700 mb-4">Student Quiz Results</h2>

      {results.length === 0 ? (
        <p className="text-gray-500 italic">No results yet.</p>
      ) : (
        <table className="min-w-full bg-yellow-50 border border-yellow-400 rounded">
          <thead className="bg-yellow-500 text-black">
            <tr>
              <th className="py-2 px-4">Student</th>
              <th className="py-2 px-4">Course</th>
              <th className="py-2 px-4">Score (%)</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r.id} className="border-b border-yellow-300">
                <td className="py-2 px-4">{r.student}</td>
                <td className="py-2 px-4">{r.course}</td>
                <td className="py-2 px-4">{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
}
