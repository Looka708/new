import { Atom, Waves, Zap, Eye, Thermometer, Magnet, Orbit, Calculator } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TopicGrid = () => {
  const topics11th = [
    { name: 'Mechanics', icon: Calculator, questions: 85, difficulty: 'Medium', color: 'bg-blue-100' },
    { name: 'Waves & Sound', icon: Waves, questions: 65, difficulty: 'Medium', color: 'bg-purple-100' },
    { name: 'Thermodynamics', icon: Thermometer, questions: 70, difficulty: 'Hard', color: 'bg-red-100' },
    { name: 'Properties of Matter', icon: Atom, questions: 55, difficulty: 'Easy', color: 'bg-green-100' }
  ];

  const topics12th = [
    { name: 'Electromagnetism', icon: Magnet, questions: 95, difficulty: 'Hard', color: 'bg-indigo-100' },
    { name: 'Optics', icon: Eye, questions: 75, difficulty: 'Medium', color: 'bg-yellow-100' },
    { name: 'Modern Physics', icon: Orbit, questions: 80, difficulty: 'Hard', color: 'bg-pink-100' },
    { name: 'Electronics', icon: Zap, questions: 60, difficulty: 'Medium', color: 'bg-cyan-100' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const TopicCard = ({ topic, delay = 0 }: { topic: any, delay?: number }) => (
    <Card 
      className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-0 bg-background animate-scale-in group cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${topic.color}`}>
          <topic.icon className="h-6 w-6 text-primary" />
        </div>
        <Badge 
          className={`${getDifficultyColor(topic.difficulty)} text-white`}
          variant="secondary"
        >
          {topic.difficulty}
        </Badge>
      </div>
      
      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {topic.name}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4">
        {topic.questions} MCQ Questions
      </p>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
      >
        Practice Now
      </Button>
    </Card>
  );

  return (
    <section id="topics" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Physics Topics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive deep into specific physics concepts with targeted MCQ practice sessions
          </p>
        </div>

        {/* Class 11th Topics */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <h3 className="text-2xl font-bold text-foreground">Class 11th Topics</h3>
            <Badge variant="outline" className="ml-4">Foundation Level</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics11th.map((topic, index) => (
              <TopicCard key={topic.name} topic={topic} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* Class 12th Topics */}
        <div>
          <div className="flex items-center mb-8">
            <h3 className="text-2xl font-bold text-foreground">Class 12th Topics</h3>
            <Badge variant="outline" className="ml-4">Advanced Level</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics12th.map((topic, index) => (
              <TopicCard key={topic.name} topic={topic} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-primary p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Master Physics?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have improved their physics understanding with our comprehensive MCQ practice platform.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicGrid;