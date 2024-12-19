import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StudentSection from "../components/StudentSection";

export default function Home() {
  return (
    <div className="w-full h-[100vh] bg-[#F6F8FA] flex">
      <Sidebar />

      <main className="flex-grow p-[20px] space-y-[10px]">
        <Header />
        <StudentSection />
      </main>
    </div>
  );
}
