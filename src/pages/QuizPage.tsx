import { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuizSetup, { QuizConfig } from '@/components/QuizSetup';
import QuizInterface, { QuizResult } from '@/components/QuizInterface';
import QuizResults from '@/components/QuizResults';

type QuizState = 'setup' | 'quiz' | 'results';

const QuizPage = () => {
  const [quizState, setQuizState] = useState<QuizState>('setup');
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config);
    setQuizState('quiz');
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setQuizState('results');
  };

  const handleRestartQuiz = () => {
    setQuizState('quiz');
  };

  const handleNewQuiz = () => {
    setQuizConfig(null);
    setQuizResult(null);
    setQuizState('setup');
  };

  if (quizState === 'setup') {
    return <QuizSetup onStartQuiz={handleStartQuiz} />;
  }

  if (quizState === 'quiz' && quizConfig) {
    return (
      <QuizInterface 
        config={quizConfig} 
        onQuizComplete={handleQuizComplete} 
      />
    );
  }

  if (quizState === 'results' && quizResult) {
    return (
      <QuizResults 
        result={quizResult}
        onRestartQuiz={handleRestartQuiz}
        onNewQuiz={handleNewQuiz}
      />
    );
  }

  // Fallback
  return <QuizSetup onStartQuiz={handleStartQuiz} />;
};

export default QuizPage;