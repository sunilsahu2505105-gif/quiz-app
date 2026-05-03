import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-indigo-800 text-indigo-200 text-center py-4 text-sm">
        © {new Date().getFullYear()} QuizMaster — Your Smart Exam Preparation Partner 🎓
      </footer>
    </div>
  );
}
