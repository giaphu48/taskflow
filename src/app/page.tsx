import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col px-4 py-8 sm:px-8 sm:py-12">
      <Header />

      <div className="flex-1 w-full max-w-screen-lg mx-auto mt-8">
        <div className="text-center text-slate-400 mt-10">
          Chưa có công việc nào.
        </div>
      </div>
    </main>
  );
}
