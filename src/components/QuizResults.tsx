import { useEffect, useState } from 'react';
import { Trophy, Medal, Clock, Target, User, Award, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuizResult } from './QuizInterface';

interface QuizResultsProps {
  result: QuizResult;
  onRestartQuiz: () => void;
  onNewQuiz: () => void;
}

interface LeaderboardEntry {
  studentName: string;
  class: string;
  chapter: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
  completedAt: Date;
}

const QuizResults = ({ result, onRestartQuiz, onNewQuiz }: QuizResultsProps) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  useEffect(() => {
    // Load existing leaderboard from localStorage
    const existingData = localStorage.getItem('passionAcademiaLeaderboard');
    const existingLeaderboard: LeaderboardEntry[] = existingData ? JSON.parse(existingData) : [];

    // Add current result to leaderboard
    const newEntry: LeaderboardEntry = {
      ...result,
      percentage
    };

    const updatedLeaderboard = [...existingLeaderboard, newEntry]
      .sort((a, b) => {
        // Sort by percentage first, then by time (faster is better)
        if (b.percentage !== a.percentage) {
          return b.percentage - a.percentage;
        }
        return a.timeSpent - b.timeSpent;
      })
      .slice(0, 10); // Keep only top 10

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('passionAcademiaLeaderboard', JSON.stringify(updatedLeaderboard));
  }, [result, percentage]);

  const getGradeInfo = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (percentage >= 50) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const gradeInfo = getGradeInfo(percentage);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Medal className="h-6 w-6 text-amber-600" />;
      default: return <Award className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-light py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Results Card */}
          <div className="space-y-6">
            <Card className="p-8 shadow-elegant border-0 bg-background/95 backdrop-blur-sm text-center">
              <div className="mb-6">
                <div className={`inline-flex p-4 rounded-full ${gradeInfo.bg} mb-4`}>
                  <Trophy className={`h-12 w-12 ${gradeInfo.color}`} />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h2>
                <p className="text-muted-foreground">Great job, {result.studentName}!</p>
              </div>

              {/* Score Display */}
              <div className="mb-8">
                <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
                <Badge className={`${gradeInfo.bg} ${gradeInfo.color} text-lg px-4 py-2`} variant="secondary">
                  Grade: {gradeInfo.grade}
                </Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{result.score}/{result.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{formatTime(result.timeSpent)}</div>
                  <div className="text-sm text-muted-foreground">Time Taken</div>
                </div>
              </div>

              {/* Quiz Details */}
              <div className="bg-muted/50 p-4 rounded-lg mb-8">
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Class: {result.class}</div>
                  <div>Chapter: {result.chapter}</div>
                  <div>Completed: {result.completedAt.toLocaleString()}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={onRestartQuiz}
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Retry This Quiz
                </Button>
                
                <Button 
                  onClick={onNewQuiz}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Take New Quiz
                </Button>
              </div>
            </Card>
          </div>

          {/* Leaderboard */}
          <div>
            <Card className="p-6 shadow-elegant border-0 bg-background/95 backdrop-blur-sm h-fit">
              <div className="flex items-center mb-6">
                <Trophy className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-2xl font-bold text-foreground">Local Leaderboard</h3>
              </div>

              {leaderboard.length === 0 ? (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No scores yet. Be the first!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        entry.studentName === result.studentName && 
                        entry.completedAt.getTime() === result.completedAt.getTime()
                          ? 'bg-primary-lighter border border-primary' 
                          : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {getRankIcon(index + 1)}
                        <div>
                          <div className="font-semibold text-foreground">{entry.studentName}</div>
                          <div className="text-sm text-muted-foreground">
                            {entry.class} • {entry.chapter.split(' - ')[0]}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{entry.percentage}%</div>
                        <div className="text-sm text-muted-foreground">
                          {entry.score}/{entry.totalQuestions} • {formatTime(entry.timeSpent)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 bg-primary-lighter/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  💡 For a global leaderboard across all students, connect to Supabase
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;