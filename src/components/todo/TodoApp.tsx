"use client";

import { useState, useEffect } from "react";
import Header from "../layout/Header";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Todo } from "@/types/todo";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const initialTodos: Todo[] = [
];

type FilterType = "all" | "active" | "completed";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

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

  const handleMoveTodo = (id: string, direction: 'top' | 'bottom' | 'up' | 'down') => {
    setTodos((prev) => {
      const index = prev.findIndex((t) => t.id === id);
      if (index === -1) return prev;
      
      const newTodos = [...prev];
      const [item] = newTodos.splice(index, 1);
      
      if (direction === 'top') {
        newTodos.unshift(item);
      } else if (direction === 'bottom') {
        newTodos.push(item);
      } else if (direction === 'up') {
        const newIndex = Math.max(0, index - ITEMS_PER_PAGE);
        newTodos.splice(newIndex, 0, item);
      } else if (direction === 'down') {
        const newIndex = Math.min(newTodos.length, index + ITEMS_PER_PAGE);
        newTodos.splice(newIndex, 0, item);
      }
      return newTodos;
    });
  };

  const handleClearCompleted = () => {
    if (window.confirm("Bạn có chắc muốn xóa tất cả công việc đã hoàn thành?")) {
      setTodos((prev) => prev.filter((todo) => !todo.isCompleted));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active" && todo.isCompleted) return false;
    if (filter === "completed" && !todo.isCompleted) return false;

    if (searchQuery.trim() && !todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase())) {
      return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  if (!isLoaded) {
    return <div className="w-full text-center text-slate-400 mt-10">Đang tải dữ liệu...</div>;
  }

  const activeCount = todos.filter((t) => !t.isCompleted).length;
  const isDragDisabled = filter !== "all" || searchQuery.trim() !== "";

  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      <Header onAddClick={() => setIsModalOpen(true)} searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <TodoForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTodo}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 gap-4">
        <span className="text-slate-500 font-medium text-sm">
          Còn <strong className="text-blue-600">{activeCount}</strong> việc chưa hoàn thành
        </span>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {(["all", "active", "completed"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === f
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                {f === "all" ? "Tất cả" : f === "active" ? "Chưa xong" : "Đã xong"}
              </button>
            ))}
          </div>

          {todos.some(t => t.isCompleted) && (
            <button
              onClick={handleClearCompleted}
              className="text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
            >
              Xóa đã xong
            </button>
          )}
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col">
            <SortableContext
              items={paginatedTodos.map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {paginatedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                  onMove={handleMoveTodo}
                  isDragDisabled={isDragDisabled}
                />
              ))}
            </SortableContext>
          </div>

          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 active:bg-slate-100"
            >
              Trước
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.max(1, totalPages) }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${currentPage === i + 1
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 active:bg-slate-200"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === Math.max(1, totalPages)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 active:bg-slate-100"
            >
              Sau
            </button>
          </div>
        </DndContext>
      )}
    </div>
  );
}
