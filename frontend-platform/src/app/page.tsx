import { Navbar } from '@/components/navbar/navbar';
import { HeroSection } from '@/components/hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
    </div>
  );
}
