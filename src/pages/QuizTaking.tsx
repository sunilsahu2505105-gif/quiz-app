import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { QuizResult } from '../types';

export default function QuizTaking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quizzes, saveResult } = useApp();

  const quiz = quizzes.find((q) => q.id === id);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (quiz) {
      setSelected(new Array(quiz.questions.length).fill(null));
      setTimeLeft(quiz.timeLimit * 60);
    }
  }, [quiz]);

  const handleSubmit = useCallback(() => {
    if (!quiz || submitted) return;
    setSubmitted(true);
    const score = quiz.questions.reduce(
      (acc, q, i) => acc + (selected[i] === q.correctIndex ? 1 : 0),
      0,
    );
    const result: QuizResult = {
      id: `${quiz.id}-${Date.now()}`,
      quizId: quiz.id,
      quizTitle: quiz.title,
      score,
      total: quiz.questions.length,
      answers: selected.map((s) => (s === null ? -1 : s)),
      completedAt: new Date().toISOString(),
    };
    saveResult(result);
    navigate(`/results/${quiz.id}`, { state: { result } });
  }, [quiz, submitted, selected, saveResult, navigate]);

  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [started, submitted, timeLeft, handleSubmit]);

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-400">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-xl">Quiz not found.</p>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl shadow-md p-10 border border-gray-100">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
          <p className="text-gray-500 mb-6">{quiz.description}</p>
          <div className="flex justify-center gap-6 mb-8 text-sm text-gray-600">
            <div className="flex flex-col items-center">
              <span className="text-2xl">❓</span>
              <span className="font-bold text-lg">{quiz.questions.length}</span>
              <span className="text-gray-400">Questions</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">⏱</span>
              <span className="font-bold text-lg">{quiz.timeLimit}</span>
              <span className="text-gray-400">Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">🏅</span>
              <span className="font-bold text-lg">{quiz.difficulty}</span>
              <span className="text-gray-400">Difficulty</span>
            </div>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-3 rounded-xl transition shadow-md text-lg"
          >
            ▶️ Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const q = quiz.questions[current];
  const mins = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');
  const progress = ((current + 1) / quiz.questions.length) * 100;
  const answeredCount = selected.filter((s) => s !== null).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-800 text-lg">{quiz.title}</h2>
          <p className="text-xs text-gray-400">
            Question {current + 1} of {quiz.questions.length} · {answeredCount} answered
          </p>
        </div>
        <div
          className={`flex items-center gap-2 font-mono text-xl font-bold ${
            timeLeft <= 60 ? 'text-red-500 animate-pulse' : 'text-indigo-700'
          }`}
        >
          ⏱ {mins}:{secs}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <p className="text-lg font-semibold text-gray-800 mb-6">
          {current + 1}. {q.text}
        </p>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                const updated = [...selected];
                updated[current] = i;
                setSelected(updated);
                setShowExplanation(false);
              }}
              className={`w-full text-left px-5 py-3 rounded-xl border-2 transition font-medium text-sm ${
                selected[current] === i
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                  : 'border-gray-200 hover:border-indigo-300 text-gray-700'
              }`}
            >
              <span className="font-bold mr-2 text-indigo-400">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          ))}
        </div>

        {q.explanation && selected[current] !== null && (
          <div className="mt-4">
            <button
              onClick={() => setShowExplanation((s) => !s)}
              className="text-sm text-indigo-600 underline"
            >
              {showExplanation ? 'Hide' : 'Show'} explanation
            </button>
            {showExplanation && (
              <div className="mt-2 bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-800">
                💡 {q.explanation}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            setCurrent((c) => c - 1);
            setShowExplanation(false);
          }}
          disabled={current === 0}
          className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-medium disabled:opacity-40 hover:bg-gray-50 transition"
        >
          ← Previous
        </button>

        {/* Question dots */}
        <div className="flex gap-1 flex-wrap justify-center">
          {quiz.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                setShowExplanation(false);
              }}
              className={`w-7 h-7 rounded-full text-xs font-bold transition ${
                i === current
                  ? 'bg-indigo-600 text-white'
                  : selected[i] !== null
                  ? 'bg-indigo-200 text-indigo-700'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {current < quiz.questions.length - 1 ? (
          <button
            onClick={() => {
              setCurrent((c) => c + 1);
              setShowExplanation(false);
            }}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition shadow-md"
          >
            ✅ Submit
          </button>
        )}
      </div>
    </div>
  );
}
