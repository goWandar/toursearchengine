'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/recipes/button/button';
import { Card, CardContent } from '@/recipes/card/card';
import { Badge } from '@/recipes/badge/badge';
import { Progress } from '@/recipes/progress/progress';
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Lightbulb,
  Calendar,
  Clock,
  Users,
  Target,
  CloudRain,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HamburgerMenu } from '@/recipes/hamburger-menu/hamburger-menu';
import { QuizNavbar } from '@/components/navbar/quiz-navbar';

interface QuizAnswers {
  timing: string;
  flexibility: string;
  crowds: string;
  priority: string;
  weather: string;
}

interface QuizQuestion {
  id: number;
  key: keyof QuizAnswers;
  title: string;
  question: string;
  options: {
    value: string;
    label: string;
    icon: React.ReactNode;
    description?: string;
    nudge: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    key: 'timing',
    title: 'Travel Timing',
    question: 'When are you planning to travel?',
    options: [
      {
        value: 'dry-season',
        label: 'Dry Season',
        icon: <Calendar className="h-8 w-8" />,
        description: 'May-October (Peak wildlife viewing)',
        nudge:
          'Dry season offers the best wildlife viewing as animals gather around water sources. Weather is predictable but expect higher prices.',
      },
      {
        value: 'wet-season',
        label: 'Wet Season',
        icon: <CloudRain className="h-8 w-8" />,
        description: 'November-April (Lush landscapes, fewer crowds)',
        nudge:
          'Wet season brings dramatic landscapes, baby animals, and lower prices. Some roads may be challenging but the experience is magical.',
      },
      {
        value: 'shoulder',
        label: 'Shoulder Season',
        icon: <Calendar className="h-8 w-8" />,
        description: 'April-May, November (Best of both worlds)',
        nudge:
          'Shoulder seasons offer good wildlife viewing with fewer crowds and moderate prices. Weather can be variable but rewarding.',
      },
      {
        value: 'flexible',
        label: "I'm Flexible",
        icon: <Clock className="h-8 w-8" />,
        description: 'Open to recommendations',
        nudge:
          "Flexibility allows us to recommend the perfect time based on your priorities, whether that's wildlife, weather, or value.",
      },
    ],
  },
  {
    id: 2,
    key: 'flexibility',
    title: 'Date Flexibility',
    question: 'How flexible are your travel dates?',
    options: [
      {
        value: 'fixed',
        label: 'Fixed Dates',
        icon: <Calendar className="h-8 w-8" />,
        description: 'Specific dates already decided',
        nudge:
          "Fixed dates work well with advance planning. We'll optimize your itinerary for the specific time you've chosen.",
      },
      {
        value: 'somewhat',
        label: 'Somewhat Flexible',
        icon: <Clock className="h-8 w-8" />,
        description: 'Can adjust by a few weeks',
        nudge:
          'Some flexibility allows us to recommend optimal timing for wildlife events or better weather conditions.',
      },
      {
        value: 'very',
        label: 'Very Flexible',
        icon: <Clock className="h-8 w-8" />,
        description: 'Open to different months',
        nudge:
          'High flexibility lets us find the perfect balance of wildlife, weather, and value for your specific interests.',
      },
      {
        value: 'last-minute',
        label: 'Last Minute',
        icon: <Clock className="h-8 w-8" />,
        description: 'Ready to go within weeks',
        nudge:
          'Last-minute bookings can offer great deals and spontaneous adventures, though options may be more limited.',
      },
    ],
  },
  {
    id: 3,
    key: 'crowds',
    title: 'Crowd Preference',
    question: 'How do you feel about crowds?',
    options: [
      {
        value: 'avoid',
        label: 'Avoid Crowds',
        icon: <Users className="h-8 w-8" />,
        description: 'Prefer remote, less visited areas',
        nudge:
          'Remote areas offer intimate wildlife encounters and pristine landscapes. Consider private conservancies or off-season travel.',
      },
      {
        value: 'some-ok',
        label: 'Some Crowds OK',
        icon: <Users className="h-8 w-8" />,
        description: "Don't mind popular spots occasionally",
        nudge:
          'Mixing popular highlights with quieter areas gives you iconic experiences plus hidden gems.',
      },
      {
        value: 'dont-mind',
        label: "Don't Mind Crowds",
        icon: <Users className="h-8 w-8" />,
        description: 'Happy to visit popular destinations',
        nudge:
          'Popular destinations are popular for good reason - they offer reliable wildlife viewing and excellent infrastructure.',
      },
      {
        value: 'enjoy',
        label: 'Enjoy the Energy',
        icon: <Users className="h-8 w-8" />,
        description: 'Like meeting other travelers',
        nudge:
          'Busy areas offer great opportunities to meet fellow travelers and share experiences. Consider group tours or popular lodges.',
      },
    ],
  },
  {
    id: 4,
    key: 'priority',
    title: 'Top Priority',
    question: "What's your top priority for timing?",
    options: [
      {
        value: 'wildlife',
        label: 'Best Wildlife Viewing',
        icon: <Target className="h-8 w-8" />,
        description: 'Optimize for animal sightings',
        nudge:
          'Wildlife-focused timing means dry season travel when animals are concentrated around water sources for optimal viewing.',
      },
      {
        value: 'weather',
        label: 'Perfect Weather',
        icon: <CloudRain className="h-8 w-8" />,
        description: 'Comfortable temperatures and conditions',
        nudge:
          'Weather-focused timing avoids extreme heat and rain, typically meaning dry season travel with mild temperatures.',
      },
      {
        value: 'photography',
        label: 'Photography Conditions',
        icon: <Target className="h-8 w-8" />,
        description: 'Best light and dramatic scenes',
        nudge:
          'Photography timing considers golden hour light, dramatic skies, and unique seasonal events like migrations or births.',
      },
      {
        value: 'value',
        label: 'Best Value',
        icon: <Target className="h-8 w-8" />,
        description: 'Lower prices and deals',
        nudge:
          'Value timing means shoulder or wet season travel when prices are lower but experiences can be even more rewarding.',
      },
    ],
  },
  {
    id: 5,
    key: 'weather',
    title: 'Weather Tolerance',
    question: 'How do you feel about rain?',
    options: [
      {
        value: 'avoid',
        label: 'Avoid Rain',
        icon: <CloudRain className="h-8 w-8" />,
        description: 'Prefer dry, predictable weather',
        nudge:
          'Dry season travel ensures minimal rain and predictable conditions, perfect for those who prefer guaranteed sunshine.',
      },
      {
        value: 'light-ok',
        label: 'Light Rain OK',
        icon: <CloudRain className="h-8 w-8" />,
        description: "Don't mind occasional showers",
        nudge:
          'Light rain can enhance the safari experience with dramatic skies and fresh, clean air. Shoulder seasons offer this balance.',
      },
      {
        value: 'embrace',
        label: 'Embrace the Elements',
        icon: <CloudRain className="h-8 w-8" />,
        description: 'Rain adds to the adventure',
        nudge:
          "Wet season travel offers lush landscapes, dramatic weather, and unique wildlife behaviors. It's truly magical for adventurous spirits.",
      },
      {
        value: 'photographer',
        label: 'Love Dramatic Weather',
        icon: <CloudRain className="h-8 w-8" />,
        description: 'Storms create amazing photos',
        nudge:
          'Dramatic weather creates the most stunning photography opportunities with moody skies, rainbows, and unique lighting conditions.',
      },
    ],
  },
];

export default function TimingQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [importance, setImportance] = useState<number>(3);
  const [showNudge, setShowNudge] = useState<boolean>(false);
  const router = useRouter();

  // Clear other quiz stage data when this quiz starts
  useEffect(() => {
    localStorage.removeItem('quiz_exploring_answers');
    localStorage.removeItem('quiz_narrowing_answers');
  }, []);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setSelectedOption(value);
    setAnswers((prev) => ({ ...prev, [currentQuestion.key]: value }));
    setShowNudge(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(answers[quizQuestions[currentQuestionIndex + 1].key] || '');
      setShowNudge(!!answers[quizQuestions[currentQuestionIndex + 1].key]);
      setImportance(3);
    } else {
      // Save answers to localStorage before navigating
      localStorage.setItem('quiz_timing_answers', JSON.stringify(answers));

      const queryParams = new URLSearchParams({
        ...(answers as Record<string, string>),
        stage: 'timing',
      });
      router.push(`/quiz/summary?${queryParams.toString()}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[quizQuestions[currentQuestionIndex - 1].key] || '');
      setShowNudge(!!answers[quizQuestions[currentQuestionIndex - 1].key]);
    }
  };

  const selectedOptionData = currentQuestion.options.find((opt) => opt.value === selectedOption);

  return (
    <div className="min-h-screen bg-[#FBF6ED]">
      {/* Header */}
      <QuizNavbar>
        <div className="flex items-center space-x-3">
          <Badge className="bg-orange-100 text-orange-700 border-0">Perfect Timing</Badge>
          <HamburgerMenu />
        </div>
      </QuizNavbar>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Smart Nudge Popup */}
        {showNudge && selectedOptionData?.nudge && (
          <div className="fixed top-24 right-4 z-50 max-w-sm">
            <Card className="shadow-2xl border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Lightbulb className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-900 text-sm mb-1">Smart Insight</h4>
                    <p className="text-orange-800 text-xs leading-relaxed">
                      {selectedOptionData.nudge}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Question Card */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 mb-8">
          <CardContent className="p-8">
            {/* Question Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentQuestion.title}</h1>
              <p className="text-xl text-gray-600">{currentQuestion.question}</p>
            </div>

            {/* Importance Rating */}
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 mb-3">How important is this to you?</p>
              <div className="flex items-center justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setImportance(star)}
                    className="transition-colors"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= importance ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerChange(option.value)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    selectedOption === option.value
                      ? 'border-orange-400 bg-orange-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`mb-4 ${
                        selectedOption === option.value ? 'text-teal-600' : 'text-gray-400'
                      }`}
                    >
                      {option.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{option.label}</h3>
                    {option.description && (
                      <p className="text-sm text-gray-600">{option.description}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2 bg-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {currentQuestionIndex === quizQuestions.length - 1
                    ? 'Ready to see your results!'
                    : `${quizQuestions.length - currentQuestionIndex - 1} questions remaining`}
                </p>
              </div>

              <Button
                variant="default"
                onClick={handleNext}
                disabled={!selectedOption}
                className="flex items-center space-x-2"
              >
                <span>
                  {currentQuestionIndex === quizQuestions.length - 1 ? 'Get My Results' : 'Next'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
