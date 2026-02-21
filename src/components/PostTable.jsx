import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiSearch, FiCheck, FiX, FiImage, FiMoreVertical } from "react-icons/fi";
import news1 from "../assets/news1.png";
import news2 from "../assets/news2.png";
import news3 from "../assets/news3.png";

export default function PostTable() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Spiritual Event", description: "Annual youth gathering with special prayers.", image: news1 },
    { id: 2, title: "Bible Study", description: "Weekly youth session to discuss scripture.", image: news2 },
    { id: 3, title: "Community Outreach", description: "Helping elders and local churches.", image: news3 },
  ]);

  const [editPost, setEditPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    if (confirm("Permanently delete this post?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Post <span className="text-yellow-500 italic">Archive</span>
          </h2>
          <p className="text-gray-500 text-sm font-medium">Manage and edit your community updates</p>
        </div>

        <div className="relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-600 transition-colors" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-5 px-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Media</th>
                <th className="py-5 px-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Post Details</th>
                <th className="py-5 px-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredPosts.map((p, index) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group hover:bg-yellow-50/30 transition-colors"
                  >
                    {/* Media Column */}
                    <td className="py-6 px-8">
                      <div className="relative w-20 h-20 overflow-hidden rounded-2xl shadow-md border border-gray-100 group-hover:scale-105 transition-transform">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                        {editPost?.id === p.id && (
                           <label className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer">
                              <FiImage className="text-white" />
                              <input type="file" className="hidden" />
                           </label>
                        )}
                      </div>
                    </td>

                    {/* Content Column */}
                    <td className="py-6 px-6 max-w-md">
                      {editPost?.id === p.id ? (
                        <div className="space-y-2">
                          <input
                            value={editPost.title}
                            onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                            className="w-full bg-gray-50 border border-yellow-200 rounded-lg px-3 py-1.5 text-sm font-bold outline-none"
                          />
                          <textarea
                            value={editPost.description}
                            onChange={(e) => setEditPost({ ...editPost, description: e.target.value })}
                            className="w-full bg-gray-50 border border-yellow-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 outline-none"
                            rows="2"
                          />
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg mb-1">{p.title}</h4>
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{p.description}</p>
                        </div>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="py-6 px-6">
                      <div className="flex items-center justify-center gap-2">
                        {editPost?.id === p.id ? (
                          <>
                            <button onClick={() => setEditPost(null)} className="p-2.5 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-200 hover:scale-110 transition-transform">
                              <FiCheck />
                            </button>
                            <button onClick={() => setEditPost(null)} className="p-2.5 bg-gray-200 text-gray-600 rounded-xl hover:scale-110 transition-transform">
                              <FiX />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => setEditPost(p)} 
                              className="p-2.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all"
                            >
                              <FiEdit2 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(p.id)} 
                              className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <FiTrash2 size={18} />
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

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                <FiSearch className="text-gray-300 text-2xl" />
              </div>
              <p className="text-gray-400 font-medium">No records found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}