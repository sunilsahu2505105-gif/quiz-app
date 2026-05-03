import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { QuizResult } from '../types';

export default function Results() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { quizzes } = useApp();

  const result: QuizResult | undefined = location.state?.result;
  const quiz = quizzes.find((q) => q.id === id);

  if (!result || !quiz) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-400">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-xl">Result not found.</p>
          <Link to="/quizzes" className="mt-4 inline-block text-indigo-600 underline">
            Go to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  const pct = Math.round((result.score / result.total) * 100);
  const pass = pct >= 60;
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : pct >= 40 ? '😊' : '😢';

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Score card */}
      <div
        className={`rounded-3xl p-10 text-center text-white mb-8 shadow-xl ${
          pass
            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
            : 'bg-gradient-to-br from-red-500 to-rose-600'
        }`}
      >
        <div className="text-7xl mb-4">{emoji}</div>
        <h1 className="text-4xl font-extrabold mb-1">{pct}%</h1>
        <p className="text-xl font-semibold mb-1">
          {result.score} / {result.total} correct
        </p>
        <p className="text-white/80 text-sm">{quiz.title}</p>
        <div
          className={`mt-4 inline-block px-4 py-1 rounded-full font-bold text-sm ${
            pass ? 'bg-white/20' : 'bg-white/20'
          }`}
        >
          {pass ? '✅ PASSED' : '❌ FAILED'} — {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good job!' : pct >= 40 ? 'Keep practicing!' : 'Needs more work!'}
        </div>
      </div>

      {/* Detailed review */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5">📋 Question Review</h2>
        <div className="space-y-5">
          {quiz.questions.map((q, i) => {
            const userAns = result.answers[i];
            const correct = userAns === q.correctIndex;
            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border-2 ${
                  correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <p className="font-semibold text-gray-800 mb-3">
                  {correct ? '✅' : '❌'} {i + 1}. {q.text}
                </p>
                <div className="space-y-1 text-sm">
                  {q.options.map((opt, j) => {
                    const isCorrect = j === q.correctIndex;
                    const isUser = j === userAns;
                    return (
                      <div
                        key={j}
                        className={`px-3 py-1.5 rounded-lg ${
                          isCorrect
                            ? 'bg-green-200 text-green-800 font-semibold'
                            : isUser && !correct
                            ? 'bg-red-200 text-red-800'
                            : 'text-gray-600'
                        }`}
                      >
                        {String.fromCharCode(65 + j)}. {opt}
                        {isCorrect && ' ← Correct'}
                        {isUser && !correct && ' ← Your answer'}
                      </div>
                    );
                  })}
                </div>
                {q.explanation && (
                  <div className="mt-3 text-xs bg-white/60 border border-indigo-100 rounded-lg p-2 text-indigo-700">
                    💡 {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => navigate(`/quiz/${quiz.id}`)}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
        >
          🔄 Retake Quiz
        </button>
        <Link
          to="/quizzes"
          className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition"
        >
          📝 More Quizzes
        </Link>
        <Link
          to="/"
          className="px-6 py-3 border-2 border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition"
        >
          🏠 Home
        </Link>
      </div>
    </div>
  );
}
