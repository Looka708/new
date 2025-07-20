import { ArrowRight, Play, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import heroImage from '@/assets/hero-physics.jpg';

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-light relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Physics Education" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Master Physics with
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Passion Academia</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Comprehensive MCQ practice for 11th & 12th grade Physics based on Punjab Textbook Board syllabus. 
              Build confidence with instant feedback and detailed explanations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant"
                onClick={() => window.location.href = '/quiz'}
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">MCQ Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Physics Topics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="animate-slide-up">
            <div className="grid grid-cols-1 gap-6">
              <Card className="p-6 shadow-subtle hover:shadow-elegant transition-shadow border-0 bg-background/80 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-lighter p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Topic-wise Practice</h3>
                    <p className="text-muted-foreground text-sm">
                      Organized by chapters and concepts for systematic learning
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-subtle hover:shadow-elegant transition-shadow border-0 bg-background/80 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-lighter p-3 rounded-lg">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Instant Feedback</h3>
                    <p className="text-muted-foreground text-sm">
                      Get immediate results with detailed explanations
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-subtle hover:shadow-elegant transition-shadow border-0 bg-background/80 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-lighter p-3 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Track Progress</h3>
                    <p className="text-muted-foreground text-sm">
                      Monitor your improvement across all physics topics
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;