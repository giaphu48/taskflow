"use client";

import { Todo } from "@/types/todo";
import { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  isDragDisabled: boolean;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit, isDragDisabled }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastTapRef = useRef<number>(0);

  const handleTextClick = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      setIsEditing(true);
    } else {
      lastTapRef.current = now;
    }
  };

  // Tự động focus vào input khi bật chế độ edit
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle && trimmedTitle !== todo.title) {
      onEdit(todo.id, trimmedTitle);
    } else {
      // Trả lại tên cũ nếu nhập rỗng
      setEditTitle(todo.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id, disabled: isDragDisabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 mb-3 bg-white border border-slate-200 rounded-xl transition-all group ${
        isDragging ? "shadow-lg opacity-80 scale-[1.02]" : "shadow-sm hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        {!isDragDisabled && (
          <button
            className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 shrink-0 touch-none"
            {...attributes}
            {...listeners}
            title="Kéo để sắp xếp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 9a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm8-16a2 2 0 110-4 2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        )}
        <div className="relative flex items-center justify-center shrink-0">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 peer appearance-none border-2 border-slate-300 rounded cursor-pointer checked:bg-blue-600 checked:border-blue-600 transition-colors"
          />
          <svg
            className={`absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {isEditing ? (
          <div className="flex flex-1 items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-1 bg-slate-50 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleSave}
              className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
              title="Lưu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        ) : (
          <span
            onClick={handleTextClick}
            onDoubleClick={() => setIsEditing(true)}
            className={`text-slate-700 font-medium transition-all flex-1 cursor-text ${todo.isCompleted ? "line-through text-slate-400" : ""
              }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 ml-4 shrink-0">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 focus:opacity-100"
            title="Sửa công việc"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 focus:opacity-100"
          title="Xóa công việc"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
