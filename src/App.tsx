import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuizList from './pages/QuizList';
import QuizTaking from './pages/QuizTaking';
import Results from './pages/Results';
import AdminPanel from './pages/AdminPanel';
import ChatBot from './pages/ChatBot';
import ExpectedQuestions from './pages/ExpectedQuestions';
import ExamGuide from './pages/ExamGuide';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/quizzes" element={<QuizList />} />
            <Route path="/quiz/:id" element={<QuizTaking />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/expected" element={<ExpectedQuestions />} />
            <Route path="/exam-guide" element={<ExamGuide />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
