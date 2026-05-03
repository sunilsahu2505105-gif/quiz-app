import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Quiz } from '../types';

const difficultyColor: Record<Quiz['difficulty'], string> = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
};

export default function QuizList() {
  const { quizzes, results } = useApp();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');

  const categories = ['All', ...Array.from(new Set(quizzes.map((q) => q.category)))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const completedMap = Object.fromEntries(
    results.map((r) => [r.quizId, r]),
  );

  const filtered = quizzes.filter((q) => {
    const matchSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase());
    const matchDiff = difficulty === 'All' || q.difficulty === difficulty;
    const matchCat = category === 'All' || q.category === category;
    return matchSearch && matchDiff && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 All Quizzes</h1>
        <p className="text-gray-500">Choose a quiz and test your knowledge!</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="🔍 Search quizzes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {difficulties.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <span className="text-sm text-gray-400">{filtered.length} quiz(zes)</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-lg">No quizzes found. Try different filters.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((quiz) => {
            const done = completedMap[quiz.id];
            const pct = done ? Math.round((done.score / done.total) * 100) : null;
            return (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col overflow-hidden"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                      {quiz.category}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        difficultyColor[quiz.difficulty]
                      }`}
                    >
                      {quiz.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{quiz.title}</h3>
                  <p className="text-sm text-gray-500 flex-1 mb-4">{quiz.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span>❓ {quiz.questions.length} questions</span>
                    <span>⏱ {quiz.timeLimit} min</span>
                  </div>
                  {pct !== null && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Your best</span>
                        <span
                          className={`font-bold ${
                            pct >= 70 ? 'text-green-600' : pct >= 40 ? 'text-yellow-600' : 'text-red-600'
                          }`}
                        >
                          {pct}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-6 pb-6">
                  <Link
                    to={`/quiz/${quiz.id}`}
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition"
                  >
                    {done ? '🔄 Retake Quiz' : '▶️ Start Quiz'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
