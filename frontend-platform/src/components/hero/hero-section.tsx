'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/recipes/button/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      className={cn(
        'relative overflow-hidden h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] max-h-[700px] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] bg-[#FBF6ED]',
      )}
    >
      {/* Custom container for content - wider than navbar but with max-width limit */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-full relative max-w-[1400px]">
        {/* Centered Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            {/* Main Heading - Matching screenshot style */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-3 sm:mb-4 lg:mb-6 bg-[linear-gradient(90deg,#464646_0%,#505A5A_20.19%,#474C4C_41.35%,#2F4848_61.06%,#384848_83.65%,#5A6969_100%)] bg-clip-text text-transparent">
              Find your perfect
              <br />
              safari adventure
            </h1>

            {/* Subtitle - Matching screenshot style */}
            <p className="text-base sm:text-lg mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed font-medium bg-[linear-gradient(90deg,#464646_0%,#505A5A_20.19%,#474C4C_41.35%,#2F4848_61.06%,#384848_83.65%,#5A6969_100%)] bg-clip-text text-transparent">
              Discover Curated African Adventures Tailored To Your Travel Style.
              <br className="hidden sm:block" />
              From Luxury Lodges To Authentic Cultural Experiences.
            </p>

            {/* Single Button - Matching screenshot style */}
            <Button variant="default" size="lg" className="text-sm sm:text-base" asChild>
              <Link href="/quiz">
                Start Your Safari Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
