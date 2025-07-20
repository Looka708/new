import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ClassSelection from '@/components/ClassSelection';
import TopicGrid from '@/components/TopicGrid';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ClassSelection />
      <TopicGrid />
      <Footer />
    </div>
  );
};

export default Index;
