import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const categories = [
  { icon: '🌐', label: 'Web Development', color: 'from-blue-500 to-cyan-500' },
  { icon: '🧮', label: 'Computer Science', color: 'from-purple-500 to-indigo-500' },
  { icon: '🗄️', label: 'Databases', color: 'from-green-500 to-teal-500' },
  { icon: '🌐', label: 'Networking', color: 'from-orange-500 to-amber-500' },
  { icon: '🐍', label: 'Programming', color: 'from-yellow-500 to-lime-500' },
];

const features = [
  {
    icon: '📝',
    title: 'Multiple Tech Quizzes',
    description: 'Practice quizzes on JavaScript, Python, DBMS, OS, Networking, and more — tailored for engineering students.',
    link: '/quizzes',
    linkLabel: 'Browse Quizzes',
  },
  {
    icon: '💬',
    title: 'AI Study ChatBot',
    description: 'Got a doubt? Ask our intelligent chatbot. It answers common questions and guides your exam prep.',
    link: '/chat',
    linkLabel: 'Open ChatBot',
  },
  {
    icon: '📚',
    title: 'Expected Q&A',
    description: 'Curated questions likely to appear in your college exams — organized by subject and topic.',
    link: '/expected',
    linkLabel: 'View Questions',
  },
  {
    icon: '🎯',
    title: 'Exam Guide',
    description: 'Strategic study plans, time management tips, and last-minute revision checklists.',
    link: '/exam-guide',
    linkLabel: 'Read Guide',
  },
  {
    icon: '⚙️',
    title: 'Admin Panel',
    description: 'Admins and teachers can add new quizzes, edit questions, and manage the question bank.',
    link: '/admin',
    linkLabel: 'Manage Quizzes',
  },
];

export default function Home() {
  const { quizzes, results } = useApp();

  const completedIds = new Set(results.map((r) => r.quizId));
  const completedCount = completedIds.size;
  const avgScore =
    results.length > 0
      ? Math.round(
          (results.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) /
            results.length)
        )
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <section className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-8 sm:p-14 shadow-xl">
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            🎓 Welcome to <span className="text-yellow-300">QuizMaster</span>
          </h1>
          <p className="text-indigo-100 text-lg sm:text-xl max-w-2xl mb-8">
            Your all-in-one exam preparation platform. Practice quizzes, explore expected questions,
            chat with our AI bot, and ace your college exams!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/quizzes"
              className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition shadow-md"
            >
              Start Practicing →
            </Link>
            <Link
              to="/expected"
              className="border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition"
            >
              Expected Questions
            </Link>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Total Quizzes', value: quizzes.length, icon: '📝' },
          { label: 'Quizzes Taken', value: completedCount, icon: '✅' },
          { label: 'Avg Score', value: avgScore !== null ? `${avgScore}%` : '—', icon: '📊' },
          { label: 'Subjects', value: categories.length, icon: '📚' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center"
          >
            <div className="text-3xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-indigo-700">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🚀 What You Get</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm flex-1 mb-4">{f.description}</p>
              <Link
                to={f.link}
                className="text-indigo-600 font-semibold text-sm hover:underline"
              >
                {f.linkLabel} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📂 Quiz Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              to={`/quizzes?category=${encodeURIComponent(cat.label)}`}
              className={`bg-gradient-to-r ${cat.color} text-white px-5 py-2.5 rounded-full font-medium text-sm shadow hover:opacity-90 transition flex items-center gap-2`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      {results.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🕐 Recent Activity</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Quiz</th>
                  <th className="px-4 py-3 text-center">Score</th>
                  <th className="px-4 py-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.slice(0, 5).map((r) => {
                  const pct = Math.round((r.score / r.total) * 100);
                  return (
                    <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{r.quizTitle}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                            pct >= 70
                              ? 'bg-green-100 text-green-700'
                              : pct >= 40
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {r.score}/{r.total} ({pct}%)
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-400">
                        {new Date(r.completedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
