import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Quiz, QuizResult, ChatMessage } from '../types';
import { seedQuizzes } from '../data/seedData';

interface AppContextType {
  quizzes: Quiz[];
  results: QuizResult[];
  chatMessages: ChatMessage[];
  addQuiz: (quiz: Quiz) => void;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;
  saveResult: (result: QuizResult) => void;
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const stored = localStorage.getItem('quizzes');
    return stored ? JSON.parse(stored) : seedQuizzes;
  });

  const [results, setResults] = useState<QuizResult[]>(() => {
    const stored = localStorage.getItem('results');
    return stored ? JSON.parse(stored) : [];
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const stored = localStorage.getItem('chatMessages');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const addQuiz = (quiz: Quiz) => setQuizzes((prev) => [...prev, quiz]);

  const updateQuiz = (quiz: Quiz) =>
    setQuizzes((prev) => prev.map((q) => (q.id === quiz.id ? quiz : q)));

  const deleteQuiz = (id: string) =>
    setQuizzes((prev) => prev.filter((q) => q.id !== id));

  const saveResult = (result: QuizResult) =>
    setResults((prev) => [result, ...prev]);

  const addChatMessage = (msg: ChatMessage) =>
    setChatMessages((prev) => [...prev, msg]);

  const clearChat = () => setChatMessages([]);

  return (
    <AppContext.Provider
      value={{
        quizzes,
        results,
        chatMessages,
        addQuiz,
        updateQuiz,
        deleteQuiz,
        saveResult,
        addChatMessage,
        clearChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
