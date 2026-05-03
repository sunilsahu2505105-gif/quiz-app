import { useState } from 'react';

const sections = [
  {
    id: 'plan',
    icon: '📅',
    title: 'Study Plan Template',
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 text-sm">
          A structured study schedule significantly improves retention. Here's a proven weekly plan:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-indigo-50">
                <th className="border border-indigo-100 px-4 py-2 text-left text-indigo-700">Day</th>
                <th className="border border-indigo-100 px-4 py-2 text-left text-indigo-700">Morning (2h)</th>
                <th className="border border-indigo-100 px-4 py-2 text-left text-indigo-700">Afternoon (2h)</th>
                <th className="border border-indigo-100 px-4 py-2 text-left text-indigo-700">Evening (1h)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Monday', 'Data Structures', 'Algorithms', 'Quiz practice'],
                ['Tuesday', 'DBMS & SQL', 'Normalization', 'Revision'],
                ['Wednesday', 'Operating Systems', 'Process & Memory', 'Mock test'],
                ['Thursday', 'Computer Networks', 'TCP/IP & HTTP', 'Expected Q&A'],
                ['Friday', 'OOP & Design Patterns', 'Language specifics', 'Quiz practice'],
                ['Saturday', 'Full mock exam', 'Review weak areas', 'Rest'],
                ['Sunday', 'Light revision', 'Flashcards review', 'Rest'],
              ].map(([day, morning, afternoon, evening]) => (
                <tr key={day} className="hover:bg-gray-50">
                  <td className="border border-gray-100 px-4 py-2 font-medium text-gray-700">{day}</td>
                  <td className="border border-gray-100 px-4 py-2 text-gray-600">{morning}</td>
                  <td className="border border-gray-100 px-4 py-2 text-gray-600">{afternoon}</td>
                  <td className="border border-gray-100 px-4 py-2 text-gray-600">{evening}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 'tips',
    icon: '💡',
    title: 'Top Study Tips',
    content: (
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            icon: '🔁',
            tip: 'Active Recall',
            desc: "Instead of re-reading, test yourself. Use flashcards, explain concepts aloud, or solve problems from memory. This is 2–3x more effective than passive reading.",
          },
          {
            icon: '⏰',
            tip: 'Pomodoro Technique',
            desc: "Study for 25 minutes, then take a 5-minute break. After 4 cycles, take a 15–30 min break. Keeps focus high and prevents burnout.",
          },
          {
            icon: '🗂️',
            tip: 'Spaced Repetition',
            desc: "Review material at increasing intervals: 1 day, 3 days, 7 days, 14 days. This fights the forgetting curve and boosts long-term retention.",
          },
          {
            icon: '✍️',
            tip: 'Feynman Technique',
            desc: "Explain the concept as if teaching it to a child. Identify gaps in your understanding, go back to the material, and simplify until it's crystal clear.",
          },
          {
            icon: '📝',
            tip: 'Practice Previous Papers',
            desc: "Solve 5+ years of previous exam papers under timed conditions. This reveals patterns in questions and builds exam speed and confidence.",
          },
          {
            icon: '🧘',
            tip: 'Sleep & Exercise',
            desc: "Your brain consolidates memory during sleep. Aim for 7–8 hours. 30 min of daily exercise improves focus and reduces exam anxiety significantly.",
          },
        ].map((item) => (
          <div key={item.tip} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{item.icon}</span>
              <h4 className="font-bold text-gray-800">{item.tip}</h4>
            </div>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'checklist',
    icon: '✅',
    title: 'Last-Week Revision Checklist',
    content: (
      <div className="space-y-3">
        <p className="text-gray-600 text-sm mb-4">
          Use this checklist in the final week before your exam:
        </p>
        {[
          {
            section: '📚 Data Structures & Algorithms',
            items: [
              'Revise array, linked list, stack, queue operations',
              'Know time complexities of all sorting algorithms',
              'Practice binary search and its variants',
              'Review tree traversals (inorder, preorder, postorder)',
              'Understand graph BFS and DFS with examples',
              'Review dynamic programming (Fibonacci, Knapsack, LCS)',
            ],
          },
          {
            section: '🗄️ DBMS',
            items: [
              'Practice SQL queries (SELECT, JOIN, GROUP BY, HAVING)',
              'Revise all 3 normal forms with examples',
              'Know ACID properties and their importance',
              'Understand difference between DDL, DML, DCL, TCL',
              'Review ER diagrams and entity relationships',
            ],
          },
          {
            section: '💻 Operating Systems',
            items: [
              'Know all CPU scheduling algorithms and calculate average waiting time',
              'Understand deadlock conditions and avoidance (Banker\'s algorithm)',
              'Revise page replacement algorithms (FIFO, LRU, Optimal)',
              'Know difference between process and thread',
              'Understand virtual memory and paging',
            ],
          },
          {
            section: '🌐 Computer Networks',
            items: [
              'List all OSI model layers and their functions',
              'Understand TCP vs UDP differences',
              'Know TCP 3-way handshake',
              'Revise common protocols and their ports (HTTP-80, HTTPS-443, FTP-21)',
              'Understand subnetting and IP addressing basics',
            ],
          },
        ].map((section) => (
          <div key={section.section} className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-800 mb-3">{section.section}</h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-indigo-400 mt-0.5">□</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'exam-day',
    icon: '🎯',
    title: 'Exam Day Strategy',
    content: (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              time: 'Night Before',
              icon: '🌙',
              tips: [
                "Don't study new topics",
                'Light revision of notes',
                'Pack your bag and stationery',
                'Sleep by 10 PM',
              ],
            },
            {
              time: 'Morning of Exam',
              icon: '☀️',
              tips: [
                'Wake up early, have breakfast',
                'Quick 15-min formula review',
                'Arrive 30 min early',
                'Stay calm and positive',
              ],
            },
            {
              time: 'During Exam',
              icon: '✏️',
              tips: [
                'Read all questions first (5 min)',
                'Attempt easy questions first',
                'Allocate time per section',
                'Review before submitting',
              ],
            },
          ].map((phase) => (
            <div key={phase.time} className="bg-indigo-50 rounded-xl p-4">
              <div className="text-3xl mb-2">{phase.icon}</div>
              <h4 className="font-bold text-indigo-700 mb-3">{phase.time}</h4>
              <ul className="space-y-1">
                {phase.tips.map((tip) => (
                  <li key={tip} className="text-sm text-gray-600 flex items-start gap-1">
                    <span className="text-indigo-400">•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-bold text-yellow-700 mb-2">⚠️ Time Management Formula</h4>
          <p className="text-sm text-gray-600">
            For a 3-hour exam with 60 questions:
            <br />• Reserve 10 minutes for reading + 10 for final review
            <br />• Spend ≤ 2.5 minutes per question
            <br />• If stuck, mark and move on — come back later
            <br />• For theory questions: answer point-by-point with clear headings
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'resources',
    icon: '📖',
    title: 'Recommended Resources',
    content: (
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            subject: '📊 Data Structures & Algorithms',
            resources: [
              'Introduction to Algorithms — CLRS',
              'Data Structures by Mark Allen Weiss',
              'LeetCode (Easy + Medium problems)',
              'GeeksForGeeks DSA articles',
            ],
          },
          {
            subject: '🗄️ DBMS',
            resources: [
              'Database System Concepts — Silberschatz',
              'W3Schools SQL Tutorial',
              'SQLZoo interactive practice',
              'Previous year university question papers',
            ],
          },
          {
            subject: '💻 Operating Systems',
            resources: [
              'Operating System Concepts — Silberschatz (Dinosaur Book)',
              'Modern Operating Systems — Tanenbaum',
              'Gate Smashers YouTube (OS playlist)',
              'GeeksForGeeks OS articles',
            ],
          },
          {
            subject: '🌐 Computer Networks',
            resources: [
              'Computer Networks — Andrew Tanenbaum',
              'Data Communications & Networking — Forouzan',
              'Kurose & Ross: Computer Networking: A Top-Down Approach',
              'Computerphile YouTube channel',
            ],
          },
          {
            subject: '🏗️ OOP & Design',
            resources: [
              'Head First Design Patterns',
              'Clean Code — Robert C. Martin',
              'Refactoring Guru (online patterns reference)',
              'Java OOP tutorials on Baeldung',
            ],
          },
          {
            subject: '🛠️ Online Practice Platforms',
            resources: [
              'LeetCode — Coding challenges',
              'HackerRank — Topic-wise practice',
              'Codeforces — Competitive programming',
              'This app — Quizzes + Expected Q&A! 😊',
            ],
          },
        ].map((item) => (
          <div key={item.subject} className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-800 mb-3">{item.subject}</h4>
            <ul className="space-y-1">
              {item.resources.map((r) => (
                <li key={r} className="text-sm text-gray-600 flex items-start gap-1">
                  <span className="text-indigo-400 mt-0.5">→</span> {r}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
];

export default function ExamGuide() {
  const [activeSection, setActiveSection] = useState<string>('plan');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎯 Exam Guide</h1>
        <p className="text-gray-500">
          Strategic study plans, tips, and resources to help you ace your exams.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-medium border-b border-gray-50 last:border-0 transition ${
                  activeSection === s.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {sections.map((s) => (
            <div key={s.id} className={activeSection === s.id ? 'block' : 'hidden'}>
              <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span>{s.icon}</span>
                <span>{s.title}</span>
              </h2>
              {s.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
