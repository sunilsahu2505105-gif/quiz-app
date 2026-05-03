import { useState } from 'react';
import { seedExpectedQuestions } from '../data/seedData';
import type { ExpectedQuestion } from '../types';

const difficultyColor: Record<ExpectedQuestion['difficulty'], string> = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
};

export default function ExpectedQuestions() {
  const [subject, setSubject] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const subjects = ['All', ...Array.from(new Set(seedExpectedQuestions.map((q) => q.subject)))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filtered = seedExpectedQuestions.filter((q) => {
    const matchSubject = subject === 'All' || q.subject === subject;
    const matchDiff = difficulty === 'All' || q.difficulty === difficulty;
    const matchSearch =
      search === '' ||
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchDiff && matchSearch;
  });

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => setExpanded(new Set(filtered.map((q) => q.id)));
  const collapseAll = () => setExpanded(new Set());

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 Expected Questions</h1>
        <p className="text-gray-500">
          Curated important questions based on college exam syllabi — with detailed answers.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="🔍 Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {subjects.map((s) => (
            <option key={s}>{s}</option>
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
        <div className="flex gap-2 ml-auto">
          <button
            onClick={expandAll}
            className="text-xs text-indigo-600 hover:underline font-medium"
          >
            Expand All
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={collapseAll}
            className="text-xs text-gray-500 hover:underline font-medium"
          >
            Collapse All
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-4">{filtered.length} question(s)</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">😕</div>
          <p>No questions match your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => {
            const isOpen = expanded.has(q.id);
            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggle(q.id)}
                  className="w-full text-left px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50 transition"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                        {q.subject}
                      </span>
                      <span className="text-xs text-gray-400">{q.topic}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          difficultyColor[q.difficulty]
                        }`}
                      >
                        {q.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium text-sm sm:text-base leading-snug">
                      {q.question}
                    </p>
                  </div>
                  <span className="text-gray-400 text-lg flex-shrink-0 mt-1">
                    {isOpen ? '▲' : '▼'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 border-t border-gray-100">
                    <div className="mt-3 bg-indigo-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                      <span className="block text-xs font-bold text-indigo-500 mb-2">
                        📖 Answer
                      </span>
                      {q.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
