"use client";

import { useState, useEffect } from "react";
import Header from "../layout/Header";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Todo } from "@/types/todo";

const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Hoàn thành bài test thực tập Next.js",
    isCompleted: false,
    createdAt: 1719792000000,
  },
  {
    id: "2",
    title: "Học thêm về Tailwind CSS và Responsive",
    isCompleted: true,
    createdAt: 1719792060000,
  },
  {
    id: "3",
    title: "Đọc tài liệu về React Server Components",
    isCompleted: false,
    createdAt: 1719792120000,
  },
  {
    id: "4",
    title: "Tối ưu hóa UI/UX với Tailwind CSS và Animations",
    isCompleted: false,
    createdAt: 1719792180000,
  },
];

type FilterType = "all" | "active" | "completed";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load dữ liệu từ LocalStorage khi khởi chạy
  useEffect(() => {
    const saved = localStorage.getItem("taskflow-todos");
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error("Lỗi khi đọc dữ liệu:", e);
        setTodos(initialTodos);
      }
    } else {
      setTodos(initialTodos);
    }
    setIsLoaded(true);
  }, []);

  // Lưu dữ liệu vào LocalStorage mỗi khi todos thay đổi
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("taskflow-todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleEditTodo = (id: string, newTitle: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Tránh lỗi Hydration Mismatch của Next.js
  if (!isLoaded) {
    return <div className="w-full text-center text-slate-400 mt-10">Đang tải dữ liệu...</div>;
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  const activeCount = todos.filter((t) => !t.isCompleted).length;

  return (
    <div className="w-full">
      <Header onAddClick={() => setIsModalOpen(true)} />

      <TodoForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTodo}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 gap-4">
        <span className="text-slate-500 font-medium text-sm">
          Còn <strong className="text-blue-600">{activeCount}</strong> việc chưa hoàn thành
        </span>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {(["all", "active", "completed"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                filter === f
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {f === "all" ? "Tất cả" : f === "active" ? "Chưa xong" : "Đã xong"}
            </button>
          ))}
        </div>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="text-center text-slate-400 mt-10 p-8 border-2 border-dashed border-slate-200 rounded-xl">
          {filter === "all" 
            ? "Chưa có công việc nào. Hãy thêm mới!" 
            : filter === "active" 
              ? "Bạn đã hoàn thành hết công việc!" 
              : "Chưa có công việc nào hoàn thành."}
        </div>
      ) : (
        <div className="flex flex-col">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
