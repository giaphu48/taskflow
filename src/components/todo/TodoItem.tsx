import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            readOnly
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
          className={`text-slate-700 font-medium transition-all ${
            todo.isCompleted ? "line-through text-slate-400" : ""
          }`}
        >
          {todo.title}
        </span>
      </div>
      
      {/* Không gian dành cho nút Xóa/Sửa ở các bước sau */}
    </div>
  );
}
