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
  Users,
  Heart,
  Camera,
  Compass,
  DollarSign,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HamburgerMenu } from '@/recipes/hamburger-menu/hamburger-menu';
import { QuizNavbar } from '@/components/navbar/quiz-navbar';


interface QuizAnswers {
  tripType: string;
  vibe: string;
  experience: string;
  comfort: string;
  priorities: string;
  duration: string;
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
    key: 'tripType',
    title: 'Your Travel Group',
    question: "Who's joining you on this adventure?",
    options: [
      {
        value: 'solo',
        label: 'Solo Adventure',
        icon: <Users className="h-8 w-8" />,
        description: 'Just me',
        nudge:
          'Solo travelers get maximum flexibility and can focus entirely on their own interests. Perfect for wildlife photography and personal reflection.',
      },
      {
        value: 'couple',
        label: 'Romantic Getaway',
        icon: <Heart className="h-8 w-8" />,
        description: 'Me and my partner',
        nudge:
          'Couples enjoy intimate game drives and romantic sundowners. Many lodges offer special honeymoon packages and private dining experiences.',
      },
      {
        value: 'family',
        label: 'Family Trip',
        icon: <Users className="h-8 w-8" />,
        description: 'With children',
        nudge:
          "Family safaris focus on educational experiences and shorter game drives. We'll recommend lodges with family suites and child-friendly activities.",
      },
      {
        value: 'friends',
        label: 'Friends Group',
        icon: <Users className="h-8 w-8" />,
        description: 'Group of friends',
        nudge:
          "Group safaris are perfect for sharing costs and experiences. You'll get group discounts and can enjoy social activities like campfire stories.",
      },
    ],
  },
  {
    id: 2,
    key: 'vibe',
    title: 'Your Safari Style',
    question: 'What kind of experience are you after?',
    options: [
      {
        value: 'relaxed',
        label: 'Relaxed & Peaceful',
        icon: <Compass className="h-8 w-8" />,
        description: 'Slow pace, mindful moments',
        nudge:
          'Relaxed safaris focus on fewer activities per day with more time for spa treatments, yoga, and peaceful wildlife observation.',
      },
      {
        value: 'adventurous',
        label: 'Adventurous & Active',
        icon: <Compass className="h-8 w-8" />,
        description: 'Packed with activities',
        nudge:
          "Adventure safaris include walking safaris, night drives, hot air balloons, and cultural visits. You'll maximize every moment.",
      },
      {
        value: 'educational',
        label: 'Educational & Cultural',
        icon: <Compass className="h-8 w-8" />,
        description: 'Learn about wildlife and cultures',
        nudge:
          'Educational safaris include expert naturalist guides, cultural village visits, and conservation project tours.',
      },
      {
        value: 'wildlife',
        label: 'Wildlife-Focused',
        icon: <Camera className="h-8 w-8" />,
        description: 'All about the animals',
        nudge:
          'Wildlife-focused safaris prioritize game drives, photography hides, and specialized wildlife guides.',
      },
    ],
  },
  {
    id: 3,
    key: 'experience',
    title: 'Safari Experience',
    question: "What's your safari experience level?",
    options: [
      {
        value: 'first-time',
        label: 'First Safari',
        icon: <Star className="h-8 w-8" />,
        description: 'This is my first African safari',
        nudge:
          'First-timers get extra guidance on what to expect, packing lists, and lodges with excellent orientation programs.',
      },
      {
        value: 'some',
        label: 'Some Experience',
        icon: <Star className="h-8 w-8" />,
        description: "I've been on 1-2 safaris",
        nudge:
          'With some experience, you can explore more specialized destinations or unique activities like walking safaris.',
      },
      {
        value: 'experienced',
        label: 'Safari Veteran',
        icon: <Star className="h-8 w-8" />,
        description: "I'm very experienced",
        nudge:
          'Experienced safari-goers can access remote destinations, specialized wildlife experiences, and off-the-beaten-path locations.',
      },
      {
        value: 'expert',
        label: 'Safari Expert',
        icon: <Star className="h-8 w-8" />,
        description: 'I know safaris inside out',
        nudge:
          'Safari experts can handle the most remote and challenging destinations with specialized wildlife and photography opportunities.',
      },
    ],
  },
  {
    id: 4,
    key: 'comfort',
    title: 'Comfort & Budget',
    question: "What's your comfort preference?",
    options: [
      {
        value: 'budget',
        label: 'Budget-Friendly',
        icon: <DollarSign className="h-8 w-8" />,
        description: '$150-300/day',
        nudge:
          'Budget safaris offer authentic bush experiences with camping and basic lodges while still seeing incredible wildlife.',
      },
      {
        value: 'midrange',
        label: 'Mid-Range Comfort',
        icon: <DollarSign className="h-8 w-8" />,
        description: '$300-600/day',
        nudge:
          'Mid-range safaris balance comfort and value with good lodges, private bathrooms, and quality meals.',
      },
      {
        value: 'luxury',
        label: 'Luxury Experience',
        icon: <DollarSign className="h-8 w-8" />,
        description: '$600+/day',
        nudge:
          'Luxury safaris include premium lodges, private guides, gourmet meals, and exclusive experiences.',
      },
      {
        value: 'ultra-luxury',
        label: 'Ultra-Luxury',
        icon: <DollarSign className="h-8 w-8" />,
        description: '$1000+/day',
        nudge:
          'Ultra-luxury safaris offer the most exclusive camps, helicopter transfers, and completely private experiences.',
      },
    ],
  },
  {
    id: 5,
    key: 'priorities',
    title: 'Your Priorities',
    question: 'What matters most to you?',
    options: [
      {
        value: 'wildlife',
        label: 'Best Wildlife',
        icon: <Camera className="h-8 w-8" />,
        description: 'Maximum animal encounters',
        nudge:
          'Wildlife-priority safaris focus on destinations with highest animal densities and best sighting opportunities.',
      },
      {
        value: 'photography',
        label: 'Photography',
        icon: <Camera className="h-8 w-8" />,
        description: 'Perfect shots are priority',
        nudge:
          'Photography safaris include specialized vehicles with camera mounts and access to the best lighting conditions.',
      },
      {
        value: 'culture',
        label: 'Cultural Experiences',
        icon: <Users className="h-8 w-8" />,
        description: 'Meeting local communities',
        nudge:
          'Cultural safaris include village visits, traditional ceremonies, and community-based tourism projects.',
      },
      {
        value: 'relaxation',
        label: 'Relaxation',
        icon: <Heart className="h-8 w-8" />,
        description: 'Comfort and pampering',
        nudge:
          'Relaxation-focused safaris include spa treatments, leisurely game drives, and luxury lodges with excellent service.',
      },
    ],
  },
  {
    id: 6,
    key: 'duration',
    title: 'Trip Duration',
    question: 'How long is your ideal safari?',
    options: [
      {
        value: 'short',
        label: 'Quick Getaway',
        icon: <Clock className="h-8 w-8" />,
        description: '3-5 days',
        nudge:
          'Short safaris focus on one main destination with intensive game viewing. Perfect for first-time visitors.',
      },
      {
        value: 'standard',
        label: 'Standard Safari',
        icon: <Clock className="h-8 w-8" />,
        description: '6-8 days',
        nudge:
          'Standard length allows visiting 2-3 destinations with good wildlife viewing and some relaxation time.',
      },
      {
        value: 'extended',
        label: 'Extended Adventure',
        icon: <Clock className="h-8 w-8" />,
        description: '9-14 days',
        nudge:
          'Extended safaris allow multiple destinations, diverse experiences, and time to truly immerse in the wilderness.',
      },
      {
        value: 'comprehensive',
        label: 'Grand Safari',
        icon: <Clock className="h-8 w-8" />,
        description: '15+ days',
        nudge:
          'Comprehensive journeys can include multiple countries, diverse ecosystems, and unique experiences like gorilla trekking.',
      },
    ],
  },
];

export default function ExploringQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [importance, setImportance] = useState<number>(3);
  const [showNudge, setShowNudge] = useState<boolean>(false);
  const router = useRouter();

  // Clear other quiz stage data when this quiz starts
  useEffect(() => {
    localStorage.removeItem('quiz_narrowing_answers');
    localStorage.removeItem('quiz_timing_answers');
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
      localStorage.setItem('quiz_exploring_answers', JSON.stringify(answers));

      const queryParams = new URLSearchParams({
        ...(answers as Record<string, string>),
        stage: 'exploring',
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
          <Badge className="bg-teal-100 text-teal-800 border-0">Just Exploring</Badge>
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
            <Card className="shadow-2xl border-teal-200 bg-teal-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-teal-100 rounded-full">
                    <Lightbulb className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Smart Insight</h4>
                    <p className="text-blue-800 text-xs leading-relaxed">
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
                      ? 'border-teal-400 bg-teal-50 shadow-lg'
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
