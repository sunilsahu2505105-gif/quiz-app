import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Quiz, Question } from '../types';

const emptyQuestion = (): Question => ({
  id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  text: '',
  options: ['', '', '', ''],
  correctIndex: 0,
  explanation: '',
});

const emptyQuiz = (): Omit<Quiz, 'id'> => ({
  title: '',
  category: '',
  description: '',
  difficulty: 'Medium',
  timeLimit: 10,
  questions: [emptyQuestion()],
});

export default function AdminPanel() {
  const { quizzes, addQuiz, updateQuiz, deleteQuiz } = useApp();
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [form, setForm] = useState<Omit<Quiz, 'id'>>(emptyQuiz());
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const startAdd = () => {
    setForm(emptyQuiz());
    setEditingQuiz(null);
    setView('add');
  };

  const startEdit = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setForm({ ...quiz });
    setView('edit');
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.category.trim() || form.questions.length === 0) return;
    if (view === 'edit' && editingQuiz) {
      updateQuiz({ ...form, id: editingQuiz.id });
    } else {
      addQuiz({ ...form, id: `quiz_${Date.now()}` });
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setView('list');
    }, 1200);
  };

  const handleDelete = (id: string) => {
    deleteQuiz(id);
    setConfirmDelete(null);
  };

  const updateQuestion = (index: number, updated: Question) => {
    const questions = [...form.questions];
    questions[index] = updated;
    setForm({ ...form, questions });
  };

  const addQuestion = () => {
    setForm({ ...form, questions: [...form.questions, emptyQuestion()] });
  };

  const removeQuestion = (index: number) => {
    const questions = form.questions.filter((_, i) => i !== index);
    setForm({ ...form, questions });
  };

  if (view === 'list') {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">⚙️ Admin Panel</h1>
            <p className="text-gray-500 mt-1">Manage quizzes and questions</p>
          </div>
          <button
            onClick={startAdd}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition shadow-md"
          >
            + Add Quiz
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {quizzes.length === 0 ? (
            <div className="p-10 text-center text-gray-400">No quizzes yet. Add one!</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 text-center hidden sm:table-cell">Difficulty</th>
                  <th className="px-4 py-3 text-center hidden sm:table-cell">Questions</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((q) => (
                  <tr key={q.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{q.title}</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{q.category}</td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          q.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-700'
                            : q.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-500 hidden sm:table-cell">
                      {q.questions.length}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEdit(q)}
                          className="text-xs px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 font-medium transition"
                        >
                          Edit
                        </button>
                        {confirmDelete === q.id ? (
                          <>
                            <button
                              onClick={() => handleDelete(q.id)}
                              className="text-xs px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg font-medium transition"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(q.id)}
                            className="text-xs px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium transition"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setView('list')}
          className="text-indigo-600 hover:underline text-sm font-medium"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {view === 'add' ? '➕ Add New Quiz' : '✏️ Edit Quiz'}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-700 mb-4">Quiz Info</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="e.g. JavaScript Basics"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Category *</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="e.g. Web Development"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                placeholder="Brief description of the quiz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) =>
                  setForm({ ...form, difficulty: e.target.value as Quiz['difficulty'] })
                }
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Time Limit (minutes)
              </label>
              <input
                type="number"
                min={1}
                max={120}
                value={form.timeLimit}
                onChange={(e) => setForm({ ...form, timeLimit: parseInt(e.target.value) || 10 })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        {form.questions.map((q, qi) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-700">Question {qi + 1}</h3>
              {form.questions.length > 1 && (
                <button
                  onClick={() => removeQuestion(qi)}
                  className="text-red-400 hover:text-red-600 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Question Text *</label>
                <textarea
                  value={q.text}
                  onChange={(e) => updateQuestion(qi, { ...q, text: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                  placeholder="Enter your question here..."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">
                  Options (select the correct answer)
                </label>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct_${qi}`}
                        checked={q.correctIndex === oi}
                        onChange={() => updateQuestion(qi, { ...q, correctIndex: oi })}
                        className="accent-indigo-600"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const opts = [...q.options];
                          opts[oi] = e.target.value;
                          updateQuestion(qi, { ...q, options: opts });
                        }}
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Explanation (optional)</label>
                <input
                  type="text"
                  value={q.explanation || ''}
                  onChange={(e) => updateQuestion(qi, { ...q, explanation: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Explain why this answer is correct..."
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="w-full py-3 border-2 border-dashed border-indigo-300 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition"
        >
          + Add Question
        </button>

        <button
          onClick={handleSave}
          disabled={!form.title.trim() || !form.category.trim()}
          className={`w-full py-3.5 font-bold rounded-xl transition shadow-md text-white ${
            saved
              ? 'bg-green-500'
              : !form.title.trim() || !form.category.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {saved ? '✅ Saved!' : view === 'add' ? '💾 Save Quiz' : '💾 Update Quiz'}
        </button>
      </div>
    </div>
  );
}
