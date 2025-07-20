import { GraduationCap, ArrowRight, BookOpen, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ClassSelection = () => {
  const classes = [
    {
      id: '11th',
      title: 'Class 11th Physics',
      description: 'Foundation concepts including mechanics, waves, and thermodynamics',
      topics: 12,
      questions: 500,
      duration: '45 mins avg',
      difficulty: 'Intermediate',
      color: 'bg-primary-lighter',
      iconColor: 'text-primary'
    },
    {
      id: '12th', 
      title: 'Class 12th Physics',
      description: 'Advanced topics covering electromagnetism, optics, and modern physics',
      topics: 15,
      questions: 600,
      duration: '60 mins avg',
      difficulty: 'Advanced',
      color: 'bg-accent',
      iconColor: 'text-primary'
    }
  ];

  return (
    <section id="classes" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Class
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your academic level to access carefully crafted MCQs aligned with Punjab Textbook Board curriculum
          </p>
        </div>

        {/* Class Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {classes.map((classItem, index) => (
            <Card 
              key={classItem.id}
              className={`p-8 shadow-subtle hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-0 ${classItem.color} group animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center mb-6">
                <div className="inline-flex p-4 rounded-full bg-background/80 mb-4">
                  <GraduationCap className={`h-8 w-8 ${classItem.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {classItem.title}
                </h3>
                <p className="text-muted-foreground">
                  {classItem.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">{classItem.topics} Topics</div>
                    <div className="text-sm text-muted-foreground">Comprehensive coverage</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">{classItem.questions} MCQs</div>
                    <div className="text-sm text-muted-foreground">Practice questions</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">{classItem.duration}</div>
                    <div className="text-sm text-muted-foreground">Per session</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">{classItem.difficulty}</div>
                    <div className="text-sm text-muted-foreground">Difficulty level</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md group-hover:shadow-lg transition-all"
                size="lg"
                onClick={() => window.location.href = '/quiz'}
              >
                Start {classItem.title}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 animate-fade-in">
          <p className="text-muted-foreground mb-4">
            All content is aligned with the official Punjab Textbook Board syllabus
          </p>
          <Button variant="outline">
            View Sample Questions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClassSelection;