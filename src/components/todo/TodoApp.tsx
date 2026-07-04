"use client";

import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

const mockTodos: Todo[] = [
  {
    id: "1",
    title: "Khởi tạo dự án Nextjs",
    isCompleted: true,
    createdAt: Date.now(),
  },
  {
    id: "2",
    title: "Thiết lập layout cơ bản",
    isCompleted: true,
    createdAt: Date.now(),
  },
  {
    id: "3",
    title: "Xây dựng Todo App để làm bài test",
    isCompleted: false,
    createdAt: Date.now(),
  },
  {
    id: "4",
    title: "Tối ưu hóa UI/UX với Tailwind CSS và Animations",
    isCompleted: false,
    createdAt: Date.now(),
  },
];

export default function TodoApp() {
  return (
    <div className="w-full">
      {mockTodos.length === 0 ? (
        <div className="text-center text-slate-400 mt-10">
          Chưa có công việc nào. Hãy thêm mới!
        </div>
      ) : (
        <div className="flex flex-col">
          {mockTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}
