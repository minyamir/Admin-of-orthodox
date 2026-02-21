import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUploadCloud, FiX, FiType, FiAlignLeft, FiImage } from "react-icons/fi";

export default function PostForm() {
  const [post, setPost] = useState({ title: "", description: "", image: null });
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost({ ...post, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setPost({ ...post, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!post.title || !post.description || !post.image) return alert("Fill all fields!");
    alert(`Success: ${post.title}`);
    setPost({ title: "", description: "", image: null });
    setPreview(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Helper Context (Optional but adds 'premium' feel) */}
        <div className="bg-gray-900 md:w-1/3 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-yellow-500 rounded-xl mb-6 flex items-center justify-center text-black font-black">P</div>
            <h2 className="text-2xl font-black leading-tight italic">Create <br/>New <span className="text-yellow-500 underline underline-offset-4">Story</span></h2>
            <p className="text-gray-400 text-sm mt-4 font-medium italic">Share updates, events, or lessons with the community.</p>
          </div>
          <div className="hidden md:block text-[10px] uppercase tracking-widest text-gray-500 font-bold">Orthodox Admin v2.0</div>
        </div>

        {/* Right Side: The Actual Form */}
        <form onSubmit={handleSubmit} className="p-8 md:w-2/3 space-y-6">
          {/* Title Input */}
          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-yellow-600 transition-colors">
              <FiType /> Content Title
            </label>
            <input
              name="title"
              value={post.title}
              onChange={handleChange}
              placeholder="e.g. Sunday Service Update"
              className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-gray-900 placeholder-gray-300 focus:ring-4 focus:ring-yellow-500/10 transition-all font-medium outline-none"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-yellow-600 transition-colors">
              <FiAlignLeft /> Description
            </label>
            <textarea
              name="description"
              value={post.description}
              onChange={handleChange}
              rows="3"
              placeholder="What is this post about?"
              className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-gray-900 placeholder-gray-300 focus:ring-4 focus:ring-yellow-500/10 transition-all font-medium outline-none resize-none"
            />
          </div>

          {/* Upload Area */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
              <FiImage /> Cover Media
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative h-44 rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden
                ${isDragging ? "border-yellow-500 bg-yellow-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100/50 hover:border-gray-300"}`}
            >
              <AnimatePresence mode="wait">
                {preview ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => { setPreview(null); setPost({...post, image: null}); }}
                      className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                    >
                      <FiX size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <div className="text-center">
                    <FiUploadCloud className="mx-auto text-3xl text-gray-300 mb-2" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Drag image or</p>
                    <label htmlFor="fileInput" className="text-sm font-black text-yellow-600 cursor-pointer hover:underline underline-offset-2">Browse Files</label>
                  </div>
                )}
              </AnimatePresence>
              <input type="file" id="fileInput" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 text-white  bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-2xl text-sm uppercase tracking-[0.2em] shadow-xl shadow-yellow-500/20 transition-all"
          >
            Publish Content
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}