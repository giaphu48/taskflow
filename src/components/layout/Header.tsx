interface HeaderProps {
  onAddClick: () => void;
}

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/60 pb-4">
      <div className="cursor-default group">
        <h1 className="text-3xl font-black tracking-tighter sm:text-4xl transition-transform duration-300 group-hover:scale-[1.02]">
          <span className="text-slate-900">Task</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-500">
            Flow
          </span>
          <span className="text-blue-500">.</span>
        </h1>
        <p className="text-xs font-medium text-slate-500 mt-1 sm:text-sm">
          Quản lý công việc hằng ngày hiệu quả
        </p>
      </div>
      <div className="mt-4 sm:mt-0 flex items-center gap-3">
        <button 
          onClick={onAddClick}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm công việc
        </button>
      </div>
    </header>
  );
}
