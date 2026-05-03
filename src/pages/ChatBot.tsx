import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import type { ChatMessage } from '../types';

// Rule-based bot responses
interface BotRule {
  patterns: string[];
  response: string;
}

const botRules: BotRule[] = [
  {
    patterns: ['hello', 'hi', 'hey', 'greet'],
    response: "👋 Hello! I'm QuizBot, your study assistant. Ask me about programming, data structures, databases, networks, or OS. You can also ask things like 'What is recursion?' or 'Explain ACID properties'.",
  },
  {
    patterns: ['recursion', 'recursive'],
    response: "🔁 **Recursion** is a technique where a function calls itself to solve smaller instances of the same problem.\n\nExample:\n```\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n```\nKey parts: (1) Base case — stops the recursion. (2) Recursive case — reduces the problem. Time complexity depends on the depth and work done per call.",
  },
  {
    patterns: ['big o', 'time complexity', 'space complexity', 'complexity'],
    response: "⏱ **Big O Notation** describes algorithm efficiency:\n\n• O(1) — Constant (array access)\n• O(log n) — Logarithmic (binary search)\n• O(n) — Linear (linear search)\n• O(n log n) — Log-linear (merge sort)\n• O(n²) — Quadratic (bubble sort)\n• O(2ⁿ) — Exponential (recursive Fibonacci)\n\nAlways aim for lower complexity for large inputs!",
  },
  {
    patterns: ['linked list', 'linkedlist'],
    response: "🔗 **Linked List** is a dynamic data structure where each node stores data and a pointer to the next node.\n\nTypes: Singly → Doubly → Circular\n\nAdvantages: O(1) insert/delete at known position, dynamic size.\nDisadvantages: O(n) access (no random access), extra memory for pointers.\n\nCommon operations: insert at head O(1), traverse O(n), search O(n).",
  },
  {
    patterns: ['stack', 'queue'],
    response: "📚 **Stack** (LIFO): push/pop from top. Used in: function calls, undo operations, expression evaluation.\n\n🚶 **Queue** (FIFO): enqueue at rear, dequeue from front. Used in: BFS, task scheduling, printer queues.\n\nBoth offer O(1) push/enqueue and pop/dequeue operations.",
  },
  {
    patterns: ['binary tree', 'bst', 'binary search tree'],
    response: "🌳 **Binary Search Tree (BST)**:\n• Left child < Parent < Right child\n• Search/Insert/Delete: O(log n) average, O(n) worst (unbalanced)\n• Inorder traversal gives sorted output\n\nSelf-balancing BSTs (AVL, Red-Black Tree) maintain O(log n) always.\n\nBST is great for dynamic sorted data with frequent lookups.",
  },
  {
    patterns: ['sorting', 'sort algorithm'],
    response: "🔄 **Sorting Algorithms**:\n\n| Algorithm | Best | Avg | Worst | Space |\n|-----------|------|-----|-------|-------|\n| Bubble | O(n) | O(n²) | O(n²) | O(1) |\n| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) |\n| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) |\n| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) |\n\nMerge sort is stable and consistent; Quick sort is fastest in practice.",
  },
  {
    patterns: ['sql', 'join', 'database', 'dbms'],
    response: "🗄️ **SQL Joins**:\n• INNER JOIN — only matching rows from both tables\n• LEFT JOIN — all rows from left + matched from right\n• RIGHT JOIN — all rows from right + matched from left\n• FULL OUTER JOIN — all rows from both tables\n\n**Key concepts**: Primary Key, Foreign Key, Normalization (1NF/2NF/3NF), ACID properties, Indexing.\n\nAsk me specifically about normalization or transactions!",
  },
  {
    patterns: ['normalization', 'normal form', '1nf', '2nf', '3nf'],
    response: "📊 **Database Normalization**:\n\n• **1NF**: Atomic values only, no repeating groups\n• **2NF**: 1NF + no partial dependencies (non-key attrs depend on full PK)\n• **3NF**: 2NF + no transitive dependencies\n• **BCNF**: Stricter 3NF — every determinant must be a candidate key\n\nGoal: Eliminate redundancy and update anomalies while preserving data integrity.",
  },
  {
    patterns: ['acid', 'transaction'],
    response: "💎 **ACID Properties**:\n\n• **Atomicity** — All-or-nothing: if any part fails, the whole transaction rolls back\n• **Consistency** — DB moves from one valid state to another\n• **Isolation** — Concurrent transactions don't interfere with each other\n• **Durability** — Committed changes persist even after system failures\n\nThese ensure reliable database operations in banking, e-commerce, etc.",
  },
  {
    patterns: ['osi model', 'osi layer', 'network layer'],
    response: "🌐 **OSI Model** (7 layers, bottom-up):\n\n1. **Physical** — Bits, cables, signals\n2. **Data Link** — Frames, MAC address, switches\n3. **Network** — Packets, IP addressing, routers\n4. **Transport** — TCP/UDP, ports, end-to-end delivery\n5. **Session** — Connection management\n6. **Presentation** — Encryption, compression, encoding\n7. **Application** — HTTP, FTP, SMTP, user-facing\n\nMnemonic: 'Please Do Not Throw Sausage Pizza Away'",
  },
  {
    patterns: ['tcp', 'udp', 'tcp vs udp'],
    response: "🔌 **TCP vs UDP**:\n\n**TCP** (Transmission Control Protocol):\n• Connection-oriented (3-way handshake)\n• Reliable, ordered, error-checked\n• Slower due to overhead\n• Used in: HTTP, FTP, email\n\n**UDP** (User Datagram Protocol):\n• Connectionless\n• Fast, but no guarantee of delivery or order\n• Used in: video streaming, DNS, gaming, VoIP",
  },
  {
    patterns: ['process', 'thread', 'os', 'operating system'],
    response: "💻 **Process vs Thread**:\n\n**Process**: Independent program in execution with its own memory space. Heavier, isolated.\n**Thread**: Lightweight unit within a process, shares memory.\n\n**Scheduling algorithms**: FCFS, SJF, Round Robin, Priority\n\n**Deadlock conditions** (all 4 must hold): Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.\n\nAsk me about specific scheduling or memory management!",
  },
  {
    patterns: ['virtual memory', 'paging', 'segmentation'],
    response: "💾 **Virtual Memory**:\nAllows processes to use more memory than physically available by using disk as an extension.\n\n**Paging**: Divides logical address into fixed-size pages → mapped to physical frames via page table.\n**Segmentation**: Divides address space into variable-size segments (code, data, stack).\n\n**Page fault**: Occurs when a page isn't in RAM → OS loads it from disk (costly!)\n**Thrashing**: Excessive page faults degrading performance — too many processes for available RAM.",
  },
  {
    patterns: ['oop', 'object oriented', 'inheritance', 'polymorphism', 'encapsulation'],
    response: "🏗️ **OOP Pillars**:\n\n• **Encapsulation** — Bundle data + methods, hide internal state (private fields)\n• **Abstraction** — Show only essentials, hide complexity (interfaces, abstract classes)\n• **Inheritance** — Child class inherits from parent (`extends`)\n• **Polymorphism** — Same interface, different behavior (method overriding/overloading)\n\n**Design Patterns**: Singleton, Factory, Observer, Strategy, Decorator — ask me about any!",
  },
  {
    patterns: ['javascript', 'js', 'closure', 'promise', 'async'],
    response: "⚡ **JavaScript Concepts**:\n\n• **Closure**: Function that remembers its outer scope even after the outer function returns\n• **Hoisting**: var declarations are moved to top of scope (not let/const)\n• **Event Loop**: Enables async without multithreading — call stack + callback queue\n• **Promises / async-await**: Handle asynchronous operations cleanly\n• **Prototype chain**: Basis of JS inheritance\n\nAsk about any specific JS topic!",
  },
  {
    patterns: ['python', 'python tips'],
    response: "🐍 **Python Tips for Exams**:\n\n• Use list comprehensions: `[x**2 for x in range(10)]`\n• `zip()`, `map()`, `filter()` for functional style\n• `enumerate()` when you need index + value\n• Generators (`yield`) for memory-efficient iteration\n• Context managers (`with`) for resource management\n• `collections.defaultdict`, `Counter`, `deque` are very useful\n• Decorators: `@staticmethod`, `@classmethod`, `@property`",
  },
  {
    patterns: ['help', 'what can you do', 'topics'],
    response: "🤖 I can help with these topics:\n\n📌 Data Structures (arrays, linked lists, trees, graphs, heaps)\n📌 Algorithms (sorting, searching, DP, greedy)\n📌 DBMS (SQL, normalization, transactions, ACID)\n📌 Operating Systems (scheduling, memory, deadlocks)\n📌 Computer Networks (OSI, TCP/IP, protocols)\n📌 OOP concepts\n📌 JavaScript & Python tips\n\nJust ask a question or type a topic name!",
  },
  {
    patterns: ['graph', 'bfs', 'dfs', 'dijkstra'],
    response: "📈 **Graph Algorithms**:\n\n• **BFS** (Breadth-First Search): Uses queue, explores level by level. Time: O(V+E). Shortest path in unweighted graphs.\n• **DFS** (Depth-First Search): Uses stack/recursion, explores as deep as possible. Time: O(V+E). Cycle detection, topological sort.\n• **Dijkstra's**: Shortest path in weighted graphs with non-negative weights. Time: O((V+E) log V) with min-heap.\n• **Bellman-Ford**: Handles negative weights. Time: O(VE).",
  },
  {
    patterns: ['dp', 'dynamic programming', 'memoization', 'tabulation'],
    response: "🧩 **Dynamic Programming**:\nSolve problems with overlapping subproblems by storing results.\n\n**Approaches**:\n• **Memoization** (top-down): Recursion + cache\n• **Tabulation** (bottom-up): Iterative + table\n\n**Classic DP Problems**:\n• Fibonacci sequence\n• 0/1 Knapsack\n• Longest Common Subsequence (LCS)\n• Coin change problem\n• Longest Increasing Subsequence (LIS)\n• Matrix chain multiplication\n\nKey insight: Define the subproblem clearly!",
  },
  {
    patterns: ['thanks', 'thank you', 'bye', 'goodbye'],
    response: "😊 You're welcome! Keep studying hard and you'll ace those exams! Remember: consistency beats cramming. Good luck! 🍀",
  },
];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const rule of botRules) {
    if (rule.patterns.some((p) => lower.includes(p))) {
      return rule.response;
    }
  }
  return `🤔 I'm not sure about "${input}" specifically. Try asking about:\n\n• Data structures (array, stack, queue, tree, graph)\n• Algorithms (sorting, BFS, DFS, DP)\n• Databases (SQL, normalization, ACID)\n• OS (scheduling, memory, deadlocks)\n• Networks (OSI model, TCP, HTTP)\n• Languages (JavaScript, Python)\n\nOr type 'help' to see all topics!`;
}

export default function ChatBot() {
  const { chatMessages, addChatMessage, clearChat } = useApp();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      text,
      isBot: false,
      timestamp: new Date().toISOString(),
    };
    addChatMessage(userMsg);
    setInput('');

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        text: getBotResponse(text),
        isBot: true,
        timestamp: new Date().toISOString(),
      };
      addChatMessage(botMsg);
    }, 600);
  };

  const suggestions = [
    'What is recursion?',
    'Explain Big O notation',
    'What is ACID in DBMS?',
    'Explain OSI model',
    'TCP vs UDP',
    'What is virtual memory?',
    'Explain OOP concepts',
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">💬 Study ChatBot</h1>
          <p className="text-sm text-gray-500">Ask doubts about CS topics — I'll explain them!</p>
        </div>
        {chatMessages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-xs text-gray-400 hover:text-red-400 transition"
          >
            Clear chat
          </button>
        )}
      </div>

      {/* Chat window */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto p-4 space-y-4 mb-4">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-8">
            <div className="text-6xl mb-4">🤖</div>
            <p className="text-lg font-medium text-gray-600 mb-2">Hi! I'm QuizBot</p>
            <p className="text-sm mb-6">Ask me anything about CS topics, or pick a suggestion:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s);
                    setTimeout(() => {
                      const userMsg: ChatMessage = {
                        id: `msg_${Date.now()}`,
                        text: s,
                        isBot: false,
                        timestamp: new Date().toISOString(),
                      };
                      addChatMessage(userMsg);
                      setTimeout(() => {
                        const botMsg: ChatMessage = {
                          id: `msg_${Date.now() + 1}`,
                          text: getBotResponse(s),
                          isBot: true,
                          timestamp: new Date().toISOString(),
                        };
                        addChatMessage(botMsg);
                      }, 600);
                      setInput('');
                    }, 0);
                  }}
                  className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.isBot
                    ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
                    : 'bg-indigo-600 text-white rounded-tr-sm'
                }`}
              >
                {msg.isBot && (
                  <span className="block text-xs font-bold text-indigo-500 mb-1">🤖 QuizBot</span>
                )}
                {msg.text}
                <span
                  className={`block text-xs mt-1 ${
                    msg.isBot ? 'text-gray-400' : 'text-indigo-200'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick suggestions */}
      {chatMessages.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-none">
          {suggestions.slice(0, 4).map((s) => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="text-xs whitespace-nowrap bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition flex-shrink-0"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask a question... e.g. 'What is a hash table?'"
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white px-5 py-3 rounded-xl font-bold transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
