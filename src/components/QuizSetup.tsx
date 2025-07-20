import { useState } from 'react';
import { Clock, User, BookOpen, Target, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

export interface QuizConfig {
  studentName: string;
  class: string;
  chapter: string;
  numberOfQuestions: number;
}

const QuizSetup = ({ onStartQuiz }: QuizSetupProps) => {
  const [studentName, setStudentName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState('10');

  const chapters = {
    '11th': [
      'Full Book'
    ],
    '12th': [
      'Full Book'
    ]
  };

  const handleStartQuiz = () => {
    if (!studentName.trim() || !selectedClass || !selectedChapter) {
      alert('Please fill in all required fields');
      return;
    }

    onStartQuiz({
      studentName: studentName.trim(),
      class: selectedClass,
      chapter: selectedChapter,
      numberOfQuestions: parseInt(numberOfQuestions)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-light py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 shadow-elegant border-0 bg-background/95 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-primary-lighter mb-4">
              <Play className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Start Your Physics Quiz</h2>
            <p className="text-muted-foreground">
              Each question has a 45-second timer. Choose your preferences below.
            </p>
          </div>

          <div className="space-y-6">
            {/* Student Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center">
                <User className="h-4 w-4 mr-2 text-primary" />
                Your Name *
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Class Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-primary" />
                Select Class *
              </Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose your class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="11th">Class 11th Physics</SelectItem>
                  <SelectItem value="12th">Class 12th Physics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Chapter Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center">
                <Target className="h-4 w-4 mr-2 text-primary" />
                Select Chapter *
              </Label>
              <Select 
                value={selectedChapter} 
                onValueChange={setSelectedChapter}
                disabled={!selectedClass}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={selectedClass ? "Choose a chapter" : "Select class first"} />
                </SelectTrigger>
                <SelectContent>
                  {selectedClass && chapters[selectedClass as keyof typeof chapters]?.map((chapter) => (
                    <SelectItem key={chapter} value={chapter}>
                      {chapter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Questions */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                Number of Questions
              </Label>
              <Select value={numberOfQuestions} onValueChange={setNumberOfQuestions}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Questions (≈ 4 minutes)</SelectItem>
                  <SelectItem value="10">10 Questions (≈ 8 minutes)</SelectItem>
                  <SelectItem value="15">15 Questions (≈ 12 minutes)</SelectItem>
                  <SelectItem value="20">20 Questions (≈ 15 minutes)</SelectItem>
                  <SelectItem value="25">25 Questions (≈ 19 minutes)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quiz Info */}
            <div className="bg-primary-lighter/50 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Quiz Information:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Each question has a 45-second time limit</li>
                <li>• You cannot go back to previous questions</li>
                <li>• Your score will be calculated automatically</li>
                <li>• Results will be shown on the local leaderboard</li>
              </ul>
            </div>

            {/* Start Button */}
            <Button 
              onClick={handleStartQuiz}
              size="lg"
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant h-12"
              disabled={!studentName.trim() || !selectedClass || !selectedChapter}
            >
              Start Quiz
              <Play className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuizSetup;