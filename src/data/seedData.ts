import type { Quiz, ExpectedQuestion } from '../types';

export const seedQuizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'JavaScript Fundamentals',
    category: 'Web Development',
    description: 'Test your knowledge of core JavaScript concepts including variables, functions, and closures.',
    difficulty: 'Easy',
    timeLimit: 10,
    questions: [
      {
        id: 'q1_1',
        text: 'Which keyword is used to declare a block-scoped variable in JavaScript?',
        options: ['var', 'let', 'global', 'define'],
        correctIndex: 1,
        explanation: '`let` declares a block-scoped variable. `var` is function-scoped, and `const` is block-scoped but immutable.',
      },
      {
        id: 'q1_2',
        text: 'What will `typeof null` return in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctIndex: 2,
        explanation: 'This is a well-known JavaScript quirk — `typeof null` returns "object" due to a legacy bug in the language.',
      },
      {
        id: 'q1_3',
        text: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctIndex: 0,
        explanation: '`push()` adds one or more elements to the end of an array and returns the new length.',
      },
      {
        id: 'q1_4',
        text: 'What does the `===` operator check?',
        options: [
          'Only value equality',
          'Only type equality',
          'Both value and type equality',
          'Reference equality',
        ],
        correctIndex: 2,
        explanation: '`===` is the strict equality operator and checks both value and type without type coercion.',
      },
      {
        id: 'q1_5',
        text: 'Which of the following is NOT a primitive data type in JavaScript?',
        options: ['string', 'number', 'object', 'boolean'],
        correctIndex: 2,
        explanation: 'Objects are not primitives. JavaScript primitives are: string, number, bigint, boolean, undefined, symbol, and null.',
      },
    ],
  },
  {
    id: 'q2',
    title: 'Data Structures & Algorithms',
    category: 'Computer Science',
    description: 'Challenge yourself with questions on arrays, linked lists, trees, sorting, and time complexity.',
    difficulty: 'Medium',
    timeLimit: 15,
    questions: [
      {
        id: 'q2_1',
        text: 'What is the time complexity of binary search on a sorted array?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correctIndex: 1,
        explanation: 'Binary search halves the search space at each step, resulting in O(log n) time complexity.',
      },
      {
        id: 'q2_2',
        text: 'Which data structure uses LIFO (Last In, First Out) order?',
        options: ['Queue', 'Stack', 'Linked List', 'Tree'],
        correctIndex: 1,
        explanation: 'A Stack follows LIFO — the last element pushed is the first one popped.',
      },
      {
        id: 'q2_3',
        text: 'What is the worst-case time complexity of QuickSort?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctIndex: 2,
        explanation: 'QuickSort has O(n²) worst-case when the pivot is always the smallest or largest element.',
      },
      {
        id: 'q2_4',
        text: 'Which traversal visits the root node first in a binary tree?',
        options: ['Inorder', 'Postorder', 'Preorder', 'Level-order'],
        correctIndex: 2,
        explanation: 'Preorder traversal visits: Root → Left → Right.',
      },
      {
        id: 'q2_5',
        text: 'What is the space complexity of merge sort?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctIndex: 2,
        explanation: 'Merge sort requires O(n) auxiliary space for the merge operation.',
      },
    ],
  },
  {
    id: 'q3',
    title: 'Database Management Systems',
    category: 'Databases',
    description: 'Test your understanding of SQL, normalization, transactions, and database design.',
    difficulty: 'Medium',
    timeLimit: 12,
    questions: [
      {
        id: 'q3_1',
        text: 'Which SQL clause is used to filter groups in a query?',
        options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
        correctIndex: 1,
        explanation: 'HAVING filters groups created by GROUP BY, while WHERE filters individual rows before grouping.',
      },
      {
        id: 'q3_2',
        text: 'What does ACID stand for in database transactions?',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Availability, Concurrency, Integrity, Distribution',
          'Atomicity, Concurrency, Isolation, Distribution',
          'Availability, Consistency, Isolation, Durability',
        ],
        correctIndex: 0,
        explanation: 'ACID properties ensure reliable database transactions: Atomicity, Consistency, Isolation, Durability.',
      },
      {
        id: 'q3_3',
        text: 'Which normal form eliminates transitive dependencies?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctIndex: 2,
        explanation: 'Third Normal Form (3NF) removes transitive dependencies where non-key attributes depend on other non-key attributes.',
      },
      {
        id: 'q3_4',
        text: 'What type of JOIN returns only rows that have matching values in both tables?',
        options: ['LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'INNER JOIN'],
        correctIndex: 3,
        explanation: 'INNER JOIN returns only rows where there is a match in both tables.',
      },
      {
        id: 'q3_5',
        text: 'Which key uniquely identifies each record in a table and cannot be NULL?',
        options: ['Foreign Key', 'Unique Key', 'Primary Key', 'Candidate Key'],
        correctIndex: 2,
        explanation: 'A Primary Key uniquely identifies each record and must be NOT NULL and UNIQUE.',
      },
    ],
  },
  {
    id: 'q4',
    title: 'Operating Systems',
    category: 'Computer Science',
    description: 'Explore concepts like process scheduling, memory management, deadlocks, and file systems.',
    difficulty: 'Hard',
    timeLimit: 15,
    questions: [
      {
        id: 'q4_1',
        text: 'Which scheduling algorithm gives the shortest average waiting time?',
        options: ['FCFS', 'Round Robin', 'SJF (Shortest Job First)', 'Priority Scheduling'],
        correctIndex: 2,
        explanation: 'SJF minimizes average waiting time by always scheduling the shortest remaining burst time first.',
      },
      {
        id: 'q4_2',
        text: 'What is a deadlock in an operating system?',
        options: [
          'When a process uses 100% CPU',
          'When two or more processes are waiting for each other to release resources',
          'When memory is full',
          'When the OS crashes',
        ],
        correctIndex: 1,
        explanation: 'A deadlock occurs when processes are stuck waiting for resources held by each other, creating a circular dependency.',
      },
      {
        id: 'q4_3',
        text: 'What is thrashing in operating systems?',
        options: [
          'A type of virus attack',
          'Excessive paging activity that degrades system performance',
          'CPU running at maximum speed',
          'A disk fragmentation issue',
        ],
        correctIndex: 1,
        explanation: 'Thrashing occurs when a system spends more time swapping pages than executing processes.',
      },
      {
        id: 'q4_4',
        text: 'Which page replacement algorithm suffers from Bélády\'s anomaly?',
        options: ['Optimal', 'LRU', 'FIFO', 'LFU'],
        correctIndex: 2,
        explanation: 'FIFO can have more page faults with more frames — this paradox is called Bélády\'s anomaly.',
      },
      {
        id: 'q4_5',
        text: 'What does a semaphore do in OS?',
        options: [
          'Manages disk I/O',
          'Controls access to shared resources through signaling',
          'Handles CPU scheduling',
          'Manages network connections',
        ],
        correctIndex: 1,
        explanation: 'Semaphores are synchronization primitives that control access to shared resources using wait (P) and signal (V) operations.',
      },
    ],
  },
  {
    id: 'q5',
    title: 'Computer Networks',
    category: 'Networking',
    description: 'Test your knowledge of TCP/IP, OSI model, protocols, and network security.',
    difficulty: 'Medium',
    timeLimit: 12,
    questions: [
      {
        id: 'q5_1',
        text: 'How many layers does the OSI model have?',
        options: ['4', '5', '6', '7'],
        correctIndex: 3,
        explanation: 'The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
      },
      {
        id: 'q5_2',
        text: 'Which protocol is responsible for assigning IP addresses dynamically?',
        options: ['DNS', 'FTP', 'DHCP', 'SMTP'],
        correctIndex: 2,
        explanation: 'DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses to devices on a network.',
      },
      {
        id: 'q5_3',
        text: 'What is the default port number for HTTPS?',
        options: ['80', '443', '8080', '21'],
        correctIndex: 1,
        explanation: 'HTTPS uses port 443 by default, while HTTP uses port 80.',
      },
      {
        id: 'q5_4',
        text: 'Which transport layer protocol provides reliable, ordered delivery?',
        options: ['UDP', 'ICMP', 'ARP', 'TCP'],
        correctIndex: 3,
        explanation: 'TCP provides reliable, ordered, and error-checked delivery through handshaking and acknowledgments.',
      },
      {
        id: 'q5_5',
        text: 'What does DNS stand for?',
        options: [
          'Dynamic Network Service',
          'Domain Name System',
          'Data Node Switching',
          'Distributed Network Security',
        ],
        correctIndex: 1,
        explanation: 'DNS (Domain Name System) translates human-readable domain names into IP addresses.',
      },
    ],
  },
  {
    id: 'q6',
    title: 'Python Programming',
    category: 'Programming',
    description: 'Test your Python skills covering syntax, data structures, OOP, and common libraries.',
    difficulty: 'Easy',
    timeLimit: 10,
    questions: [
      {
        id: 'q6_1',
        text: 'What is the output of `print(type([]))` in Python?',
        options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'dict'>"],
        correctIndex: 1,
        explanation: '[] is a list literal in Python, so type([]) returns <class \'list\'>.',
      },
      {
        id: 'q6_2',
        text: 'Which Python keyword is used to handle exceptions?',
        options: ['catch', 'except', 'error', 'handle'],
        correctIndex: 1,
        explanation: 'Python uses `try...except` blocks for exception handling, not `try...catch` like Java/JavaScript.',
      },
      {
        id: 'q6_3',
        text: 'What does `//` do in Python?',
        options: ['Division', 'Integer (floor) division', 'Modulo', 'Power'],
        correctIndex: 1,
        explanation: '`//` is the floor division operator — it divides and rounds down to the nearest integer.',
      },
      {
        id: 'q6_4',
        text: 'Which method is used to remove whitespace from the start and end of a string?',
        options: ['trim()', 'strip()', 'clean()', 'lstrip()'],
        correctIndex: 1,
        explanation: '`strip()` removes leading and trailing whitespace. `lstrip()` and `rstrip()` remove from left and right only.',
      },
      {
        id: 'q6_5',
        text: 'What is a lambda function in Python?',
        options: [
          'A recursive function',
          'A function defined in a class',
          'An anonymous single-expression function',
          'A function that returns None',
        ],
        correctIndex: 2,
        explanation: 'Lambda functions are anonymous functions defined with the `lambda` keyword: `lambda x: x * 2`.',
      },
    ],
  },
];

export const seedExpectedQuestions: ExpectedQuestion[] = [
  // Data Structures
  {
    id: 'eq1',
    subject: 'Data Structures',
    topic: 'Arrays & Linked Lists',
    question: 'What is the difference between an array and a linked list?',
    answer:
      'Arrays store elements in contiguous memory locations with O(1) random access but O(n) insertion/deletion. Linked lists use nodes with pointers, offering O(n) access but O(1) insertion/deletion at a known position. Arrays have better cache performance; linked lists are more flexible for dynamic size.',
    difficulty: 'Easy',
  },
  {
    id: 'eq2',
    subject: 'Data Structures',
    topic: 'Trees',
    question: 'Explain AVL trees and how they maintain balance.',
    answer:
      'An AVL tree is a self-balancing BST where the height difference (balance factor) between left and right subtrees of any node is at most 1. After insertions or deletions, rotations (LL, RR, LR, RL) are performed to restore balance. This ensures O(log n) time for search, insert, and delete operations.',
    difficulty: 'Medium',
  },
  {
    id: 'eq3',
    subject: 'Data Structures',
    topic: 'Hashing',
    question: 'What is collision in hashing and how is it resolved?',
    answer:
      'Collision occurs when two keys hash to the same index. Resolution methods: (1) Chaining — store colliding elements in a linked list at that index. (2) Open Addressing — probe for the next empty slot using linear probing, quadratic probing, or double hashing.',
    difficulty: 'Medium',
  },
  // Algorithms
  {
    id: 'eq4',
    subject: 'Algorithms',
    topic: 'Sorting',
    question: 'Compare Merge Sort and Quick Sort.',
    answer:
      'Merge Sort: stable, always O(n log n), requires O(n) extra space, good for linked lists and external sorting. Quick Sort: in-place (O(log n) stack space), average O(n log n) but worst-case O(n²), typically faster in practice due to better cache performance and lower constants.',
    difficulty: 'Medium',
  },
  {
    id: 'eq5',
    subject: 'Algorithms',
    topic: 'Dynamic Programming',
    question: 'What is dynamic programming? Give an example.',
    answer:
      'Dynamic programming solves problems by breaking them into overlapping subproblems, solving each once, and storing the result (memoization/tabulation). Example: Fibonacci — instead of recomputing fib(n-1) and fib(n-2) repeatedly, store computed values. Used in: Knapsack, Longest Common Subsequence, shortest path problems.',
    difficulty: 'Medium',
  },
  // DBMS
  {
    id: 'eq6',
    subject: 'DBMS',
    topic: 'Normalization',
    question: 'Explain the first three normal forms with examples.',
    answer:
      '1NF: Eliminate repeating groups; each column must have atomic values. 2NF: 1NF + no partial dependencies (non-key attributes must depend on the entire composite primary key). 3NF: 2NF + no transitive dependencies (non-key attributes must not depend on other non-key attributes). Example: Student(ID, Name, CourseID, CourseName) — CourseName depends on CourseID (transitive), so split into Student and Course tables.',
    difficulty: 'Medium',
  },
  {
    id: 'eq7',
    subject: 'DBMS',
    topic: 'Transactions',
    question: 'What are ACID properties? Why are they important?',
    answer:
      'ACID ensures reliable transactions: Atomicity (all-or-nothing execution), Consistency (database remains in valid state), Isolation (concurrent transactions don\'t interfere), Durability (committed changes persist even after crashes). They are critical for banking, e-commerce, and any system where data integrity is essential.',
    difficulty: 'Easy',
  },
  // Operating Systems
  {
    id: 'eq8',
    subject: 'Operating Systems',
    topic: 'Process Scheduling',
    question: 'Explain Round Robin scheduling with an example.',
    answer:
      'Round Robin assigns a fixed time quantum to each process in a circular queue. If a process doesn\'t finish in its quantum, it goes to the back of the queue. Example: Processes P1(24ms), P2(3ms), P3(3ms) with quantum=4ms. P1 runs 4ms, P2 runs 3ms, P3 runs 3ms, P1 runs 4ms... Total: P2 finishes at 7ms, P3 at 10ms, P1 at 30ms. Good for time-sharing systems.',
    difficulty: 'Medium',
  },
  {
    id: 'eq9',
    subject: 'Operating Systems',
    topic: 'Memory Management',
    question: 'What is virtual memory and how does paging work?',
    answer:
      'Virtual memory allows processes to use more memory than physically available by using disk as an extension of RAM. Paging divides logical address space into fixed-size pages and physical memory into frames. The OS maintains a page table mapping pages to frames. When a page isn\'t in RAM (page fault), it\'s loaded from disk. Benefits: process isolation, efficient memory use, allows larger programs.',
    difficulty: 'Hard',
  },
  // Computer Networks
  {
    id: 'eq10',
    subject: 'Computer Networks',
    topic: 'OSI Model',
    question: 'Explain the OSI model layers and their functions.',
    answer:
      '7 layers (bottom to top): (1) Physical — raw bit transmission; (2) Data Link — framing, MAC addressing, error detection; (3) Network — routing, IP addressing; (4) Transport — end-to-end delivery, TCP/UDP; (5) Session — manages connections; (6) Presentation — data format, encryption; (7) Application — user-facing protocols (HTTP, FTP, SMTP). Each layer serves the layer above and uses services of the layer below.',
    difficulty: 'Medium',
  },
  {
    id: 'eq11',
    subject: 'Computer Networks',
    topic: 'TCP/IP',
    question: 'What is the three-way handshake in TCP?',
    answer:
      'TCP establishes a connection using three steps: (1) SYN — client sends a SYN packet with an initial sequence number; (2) SYN-ACK — server responds with SYN-ACK acknowledging the client\'s sequence and sending its own; (3) ACK — client sends ACK to acknowledge the server\'s sequence. Connection is now established. This ensures both sides are ready to communicate reliably.',
    difficulty: 'Medium',
  },
  // Web Development
  {
    id: 'eq12',
    subject: 'Web Development',
    topic: 'HTTP & REST',
    question: 'What are REST API principles?',
    answer:
      'REST (Representational State Transfer) principles: (1) Stateless — each request contains all needed info; (2) Client-Server — separation of concerns; (3) Uniform Interface — standard HTTP methods (GET, POST, PUT, DELETE); (4) Cacheable — responses indicate cacheability; (5) Layered System — client unaware of intermediaries; (6) Resource-Based — everything is a resource with a unique URI.',
    difficulty: 'Medium',
  },
  {
    id: 'eq13',
    subject: 'Web Development',
    topic: 'JavaScript',
    question: 'Explain event loop and asynchronous JavaScript.',
    answer:
      'JavaScript is single-threaded but handles async operations via the event loop. The call stack executes synchronous code. Async operations (setTimeout, fetch) are delegated to Web APIs. When complete, callbacks are queued in the callback queue (or microtask queue for Promises). The event loop continuously checks if the call stack is empty and moves queued callbacks to it. This enables non-blocking I/O without multiple threads.',
    difficulty: 'Hard',
  },
  // OOP
  {
    id: 'eq14',
    subject: 'OOP',
    topic: 'Concepts',
    question: 'Explain the four pillars of OOP with examples.',
    answer:
      '(1) Encapsulation — bundling data and methods, hiding internal state (e.g., private fields with getters/setters). (2) Abstraction — hiding complex implementation, exposing only essentials (e.g., abstract classes, interfaces). (3) Inheritance — child class inherits properties/methods from parent (e.g., `class Dog extends Animal`). (4) Polymorphism — same interface, different implementations (e.g., method overriding, method overloading).',
    difficulty: 'Easy',
  },
  {
    id: 'eq15',
    subject: 'OOP',
    topic: 'Design Patterns',
    question: 'What is the Singleton design pattern and when should you use it?',
    answer:
      'Singleton ensures a class has only one instance and provides a global access point. Implementation: private constructor, static instance variable, static getInstance() method. Use cases: database connections, configuration managers, logging services, thread pools. Caution: can make testing harder and introduce hidden global state.',
    difficulty: 'Hard',
  },
];
