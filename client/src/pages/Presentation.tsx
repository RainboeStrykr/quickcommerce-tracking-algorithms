import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slide1 from '@/components/slides/Slide1';
import Slide2 from '@/components/slides/Slide2';
import Slide3 from '@/components/slides/Slide3';
import Slide4 from '@/components/slides/Slide4';
import Slide5 from '@/components/slides/Slide5';
import Slide6 from '@/components/slides/Slide6';
import Slide7 from '@/components/slides/Slide7';
import Slide8 from '@/components/slides/Slide8';
import Slide9 from '@/components/slides/Slide9';
import Slide10 from '@/components/slides/Slide10';

const slides = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8,
  Slide9,
  Slide10,
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const CurrentSlide = slides[currentSlide];

  return (
    <div className="h-screen bg-slate-950 dark:bg-slate-900 flex flex-col relative overflow-hidden">
      {/* Full-screen slide content */}
      <div className="flex-1 min-h-0 h-full overflow-auto pb-32">
        <CurrentSlide />
      </div>

      {/* Navigation Controls - Overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 to-transparent px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 dark:bg-slate-700/80 dark:hover:bg-slate-600 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-blue-500 w-8'
                    : 'bg-slate-600 w-2 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide counter - top right */}
      <div className="absolute top-6 right-6 text-slate-400 text-sm font-medium bg-slate-900/80 px-3 py-1 rounded-full">
        Slide {currentSlide + 1} of {slides.length}
      </div>
    </div>
  );
}
