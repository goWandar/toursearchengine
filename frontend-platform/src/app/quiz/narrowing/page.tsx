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
  MapPin,
  DollarSign,
  Clock,
  Home,
  Camera,
  Utensils,
  Compass,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HamburgerMenu } from '@/recipes/hamburger-menu/hamburger-menu';
import { QuizNavbar } from '@/components/navbar/quiz-navbar';


interface QuizAnswers {
  region: string;
  budget: string;
  pace: string;
  accommodation: string;
  activities: string;
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
    key: 'region',
    title: 'Destination Focus',
    question: 'Which region interests you most?',
    options: [
      {
        value: 'east-africa',
        label: 'East Africa',
        icon: <MapPin className="h-8 w-8" />,
        description: 'Kenya, Tanzania, Uganda',
        nudge:
          'East Africa offers the Great Migration, diverse wildlife, and excellent infrastructure. Perfect for first-time safari-goers.',
      },
      {
        value: 'southern-africa',
        label: 'Southern Africa',
        icon: <MapPin className="h-8 w-8" />,
        description: 'South Africa, Botswana, Zambia',
        nudge:
          'Southern Africa provides luxury lodges, excellent wine regions, and unique desert experiences in addition to classic safari.',
      },
      {
        value: 'west-africa',
        label: 'West Africa',
        icon: <MapPin className="h-8 w-8" />,
        description: 'Ghana, Senegal, Gambia',
        nudge:
          'West Africa offers rich cultural experiences, unique wildlife, and fewer crowds for adventurous travelers.',
      },
      {
        value: 'central-africa',
        label: 'Central Africa',
        icon: <MapPin className="h-8 w-8" />,
        description: 'Rwanda, Congo, Cameroon',
        nudge:
          'Central Africa is perfect for gorilla trekking, pristine rainforests, and truly off-the-beaten-path experiences.',
      },
    ],
  },
  {
    id: 2,
    key: 'budget',
    title: 'Budget Planning',
    question: "What's your daily budget per person?",
    options: [
      {
        value: 'budget',
        label: 'Budget Conscious',
        icon: <DollarSign className="h-8 w-8" />,
        description: '$100-250/day',
        nudge:
          'Budget safaris focus on camping, basic lodges, and group tours while still offering incredible wildlife experiences.',
      },
      {
        value: 'moderate',
        label: 'Moderate Spending',
        icon: <DollarSign className="h-8 w-8" />,
        description: '$250-500/day',
        nudge:
          'Moderate budgets allow comfortable lodges, private guides, and a good balance of activities and relaxation.',
      },
      {
        value: 'premium',
        label: 'Premium Experience',
        icon: <DollarSign className="h-8 w-8" />,
        description: '$500-1000/day',
        nudge:
          'Premium safaris include luxury lodges, private vehicles, gourmet dining, and exclusive experiences.',
      },
      {
        value: 'luxury',
        label: 'Luxury & Exclusive',
        icon: <DollarSign className="h-8 w-8" />,
        description: '$1000+/day',
        nudge:
          'Luxury safaris offer the most exclusive camps, helicopter transfers, private conservancies, and personalized service.',
      },
    ],
  },
  {
    id: 3,
    key: 'pace',
    title: 'Travel Pace',
    question: "What's your preferred travel pace?",
    options: [
      {
        value: 'slow',
        label: 'Slow & Immersive',
        icon: <Clock className="h-8 w-8" />,
        description: 'Stay longer in fewer places',
        nudge:
          'Slow travel allows deeper connections with places, better wildlife photography opportunities, and more relaxation.',
      },
      {
        value: 'moderate',
        label: 'Balanced Pace',
        icon: <Clock className="h-8 w-8" />,
        description: 'Mix of activities and downtime',
        nudge:
          'Balanced pace offers variety while avoiding travel fatigue, perfect for experiencing different ecosystems.',
      },
      {
        value: 'active',
        label: 'Active & Packed',
        icon: <Clock className="h-8 w-8" />,
        description: 'Maximize experiences and destinations',
        nudge:
          'Active pace allows seeing multiple destinations and activities, ideal for those with limited time but high energy.',
      },
      {
        value: 'flexible',
        label: 'Flexible & Spontaneous',
        icon: <Clock className="h-8 w-8" />,
        description: 'Adapt based on opportunities',
        nudge:
          'Flexible itineraries allow following wildlife movements and weather patterns for optimal experiences.',
      },
    ],
  },
  {
    id: 4,
    key: 'accommodation',
    title: 'Accommodation Style',
    question: "What's your accommodation preference?",
    options: [
      {
        value: 'camping',
        label: 'Camping & Authentic',
        icon: <Home className="h-8 w-8" />,
        description: 'Tents and bush camping',
        nudge:
          'Camping offers the most authentic bush experience with sounds of nature and closer connection to wildlife.',
      },
      {
        value: 'lodge',
        label: 'Comfortable Lodges',
        icon: <Home className="h-8 w-8" />,
        description: 'Mid-range lodges and camps',
        nudge:
          'Lodges provide comfort with private bathrooms, good meals, and professional service while maintaining safari atmosphere.',
      },
      {
        value: 'luxury',
        label: 'Luxury Camps',
        icon: <Home className="h-8 w-8" />,
        description: 'High-end safari camps',
        nudge:
          'Luxury camps offer spacious tents, gourmet dining, spa services, and exceptional locations with premium service.',
      },
      {
        value: 'mixed',
        label: 'Mixed Experiences',
        icon: <Home className="h-8 w-8" />,
        description: 'Variety of accommodation types',
        nudge:
          'Mixed accommodations allow experiencing different aspects of safari life from authentic camping to luxury comfort.',
      },
    ],
  },
  {
    id: 5,
    key: 'activities',
    title: 'Activity Preferences',
    question: 'What activities are must-haves?',
    options: [
      {
        value: 'game-drives',
        label: 'Classic Game Drives',
        icon: <Camera className="h-8 w-8" />,
        description: 'Traditional vehicle safaris',
        nudge:
          'Game drives offer the best wildlife viewing opportunities and are perfect for photography and comfortable observation.',
      },
      {
        value: 'walking',
        label: 'Walking Safaris',
        icon: <Compass className="h-8 w-8" />,
        description: 'On-foot bush experiences',
        nudge:
          'Walking safaris provide intimate wildlife encounters, tracking skills, and deeper understanding of ecosystems.',
      },
      {
        value: 'cultural',
        label: 'Cultural Experiences',
        icon: <Utensils className="h-8 w-8" />,
        description: 'Local community visits',
        nudge:
          'Cultural activities include village visits, traditional ceremonies, and learning about local customs and conservation.',
      },
      {
        value: 'adventure',
        label: 'Adventure Activities',
        icon: <Compass className="h-8 w-8" />,
        description: 'Hot air balloons, night drives',
        nudge:
          'Adventure activities like balloon safaris and night drives offer unique perspectives and exclusive wildlife encounters.',
      },
    ],
  },
];

export default function NarrowingQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [importance, setImportance] = useState<number>(3);
  const [showNudge, setShowNudge] = useState<boolean>(false);
  const router = useRouter();

  // Clear other quiz stage data when this quiz starts
  useEffect(() => {
    localStorage.removeItem('quiz_exploring_answers');
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
      localStorage.setItem('quiz_narrowing_answers', JSON.stringify(answers));

      const queryParams = new URLSearchParams({
        ...(answers as Record<string, string>),
        stage: 'narrowing',
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
          <Badge className="bg-orange-100 text-orange-700 border-0">Narrowing Down</Badge>
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
