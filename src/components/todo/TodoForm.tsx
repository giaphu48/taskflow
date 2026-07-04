"use client";

import { useState, useEffect, useRef } from "react";

interface TodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

export default function TodoForm({ isOpen, onClose, onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Nội dung công việc không được để trống!");
      return;
    }
    onAdd(trimmedTitle);
    setTitle("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100 relative z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-xl font-bold text-slate-900 mb-4">Thêm công việc mới</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Nội dung công việc
            </label>
            <input
              ref={inputRef}
              type="text"
              placeholder="Nhập việc cần làm..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${error
                ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
                }`}
            />
            {error && (
              <p className="text-sm text-red-500 mt-1.5 ml-1 font-medium">
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors text-sm"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all active:scale-95 shadow-sm text-sm"
            >
              Tạo công việc
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
