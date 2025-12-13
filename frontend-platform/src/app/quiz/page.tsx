'use client';

import Link from 'next/link';
import { Button } from '@/recipes/button/button';
import { Card, CardContent } from '@/recipes/card/card';
import { Badge } from '@/recipes/badge/badge';
import { CheckCircle, ArrowRight, HelpCircle, Sparkles, Users, Star, Globe } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/recipes/popover/popover';
import { QuizNavbar } from '@/components/navbar/quiz-navbar';

import { useState } from 'react';
const countries = [
  { name: 'Kenya', flag: '🇰🇪', highlight: 'The Great Migration' },
  { name: 'Tanzania', flag: '🇹🇿', highlight: 'Serengeti & Ngorongoro' },
  { name: 'South Africa', flag: '🇿🇦', highlight: 'Big Five & Wine Country' },
  { name: 'Botswana', flag: '🇧🇼', highlight: 'Okavango Delta' },
];

const stages = [
  {
    id: 'exploring',
    title: 'Exploring',
    description:
      "Perfect for first-time safari goers or those who want to discover their preferences. We'll help you understand what type of safari experience appeals to you most.",
    icon: <Sparkles className="h-8 w-8" />,
    duration: '3-5 min',
    questions: '6 questions',
    solidColor: 'bg-teal-500',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-300',
    personalizedMessage:
      "Great choice! We'll start by understanding your travel style and what excites you most about safari.",
  },
  {
    id: 'narrowing',
    title: 'Narrowing',
    description:
      'For travelers who have some safari knowledge and want to focus on specific destinations, budgets, and experiences that match their preferences.',
    icon: <ArrowRight className="h-8 w-8" />,
    duration: '4-6 min',
    questions: '5 questions',
    solidColor: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-300',
    personalizedMessage:
      "Perfect! We'll help you narrow down destinations and experiences based on your specific interests and budget.",
  },
  {
    id: 'timing',
    title: 'Timing',
    description:
      'Ideal for travelers who know what they want and need help with the best timing, seasonal considerations, and final planning details.',
    icon: <CheckCircle className="h-8 w-8" />,
    duration: '3-4 min',
    questions: '5 questions',
    solidColor: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-300',
    personalizedMessage:
      "Excellent! We'll focus on timing, seasonality, and final details to make your safari perfect.",
  },
];

export default function QuizPage() {
  const [showCountries, setShowCountries] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF6ED]">
      {/* Header */}
      <QuizNavbar />
      

      {/* Hero Section */}
      <section className="py-20 bg-[#FBF6ED] relative">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-8 shadow-2xl">
            <Sparkles className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find the safari that fits
            <span className="block text-orange-600">— without the stress</span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Most safari sites give you options. Wandar helps you choose.
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-center space-x-8 mb-12">
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="h-5 w-5 text-teal-500" />
              <span className="font-semibold">50,000+ travelers</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Star className="h-5 w-5 text-orange-500" />
              <span className="font-semibold">4.9/5 rating</span>
            </div>
            <Popover open={showCountries} onOpenChange={setShowCountries}>
              <PopoverTrigger asChild>
                <div className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-teal-600 transition-colors">
                  <Globe className="h-5 w-5 text-teal-500" />
                  <span className="font-semibold">4 countries covered</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="center">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 mb-3">Our Safari Destinations</h4>
                  {countries.map((country, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <div className="font-medium text-gray-900">{country.name}</div>
                        <div className="text-sm text-gray-600">{country.highlight}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Stage Selection */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Starting Point</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the stage that best matches where you are in your safari planning journey
            </p>
          </div>

          <div className="grid gap-6">
            {stages.map((stage, index) => (
              <Link key={stage.id} href={`/quiz/${stage.id}`}>
                <Card className="cursor-pointer transition-all duration-300 border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg hover:scale-[1.01] group">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${stage.bgColor} group-hover:bg-orange-100 transition-all`}
                      >
                        <div
                          className={`${stage.textColor} group-hover:text-orange-700 transition-colors`}
                        >
                          {stage.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {stage.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {stage.duration}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {stage.questions}
                          </Badge>
                        </div>
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                          {stage.description}
                        </p>
                      </div>

                      {/* Arrow Icon */}
                      <div className="flex-shrink-0 mt-2">
                        <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section className="text-center mt-12">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-gray-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">Not sure where to start?</h4>
                  <p className="text-gray-600 mb-4">
                    If you&apos;re completely new to safari planning, we recommend starting with the{' '}
                    <strong>Exploring</strong> stage to discover your preferences first.
                  </p>
                  <Link href="/quiz/exploring">
                    <Button variant="default" size="sm">
                      Start from the Beginning
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
