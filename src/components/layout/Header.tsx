interface HeaderProps {
  onAddClick: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function Header({ onAddClick, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 border-b border-slate-200/60 pb-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="cursor-default group shrink-0">
          <h1 className="text-3xl font-black tracking-tighter sm:text-4xl transition-transform duration-300 group-hover:scale-[1.02]">
            <span className="text-slate-900">Task</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-500">
              Flow
            </span>
            <span className="text-blue-500">.</span>
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1 sm:text-sm">
            Quản lý công việc hiệu quả
          </p>
        </div>

        <button
          onClick={onAddClick}
          className="flex w-full sm:w-auto justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 shadow-sm whitespace-nowrap shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm việc
        </button>
      </div>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Tìm kiếm công việc..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 pl-11 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
        />
        <svg className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </header>
  );
}
