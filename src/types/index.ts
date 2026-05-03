export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number; // in minutes
  questions: Question[];
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number;
  total: number;
  answers: number[];
  completedAt: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

export interface ExpectedQuestion {
  id: string;
  subject: string;
  topic: string;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
