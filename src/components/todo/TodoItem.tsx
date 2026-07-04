import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
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
        <span
          className={`text-slate-700 font-medium transition-all ${todo.isCompleted ? "line-through text-slate-400" : ""
            }`}
        >
          {todo.title}
        </span>
      </div>

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
  );
}
