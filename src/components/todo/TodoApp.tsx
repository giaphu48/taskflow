"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import Header from "@/components/layout/Header";

const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Khởi tạo dự án Nextjs",
    isCompleted: true,
    createdAt: 1719792000000,
  },
  {
    id: "2",
    title: "Thiết lập layout cơ bản",
    isCompleted: true,
    createdAt: 1719792060000,
  },
  {
    id: "3",
    title: "Xây dựng Todo App để làm bài test",
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

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="w-full">
      <Header onAddClick={() => setIsModalOpen(true)} />

      <TodoForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTodo}
      />

      {todos.length === 0 ? (
        <div className="text-center text-slate-400 mt-10">
          Chưa có công việc nào. Hãy thêm mới!
        </div>
      ) : (
        <div className="flex flex-col">
          {todos.map((todo) => (
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
