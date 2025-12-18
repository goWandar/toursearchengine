'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Button } from '@/recipes/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/recipes/card/card';
import { Badge } from '@/recipes/badge/badge';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Compass,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp,
  Send,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { QuizNavbar } from '@/components/navbar/quiz-navbar';
import {
  mapQuizAnswersToFilters,
  formatFiltersForDisplay,
  BackendFilters,
} from '@/lib/quiz-filter-mapper';

function QuizResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [backendFilters, setBackendFilters] = useState<BackendFilters>({});
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [completedStage, setCompletedStage] = useState<string>('');

  useEffect(() => {
    // First, try to get data from localStorage (for complete quiz flow)
    let exploringData: Record<string, string | string[]> = {};
    let narrowingData: Record<string, string | string[]> = {};
    let timingData: Record<string, string | string[]> = {};
    let stage = '';

    // Check localStorage first
    const storedExploring = localStorage.getItem('quiz_exploring_answers');
    const storedNarrowing = localStorage.getItem('quiz_narrowing_answers');
    const storedTiming = localStorage.getItem('quiz_timing_answers');

    if (storedExploring) {
      try {
        exploringData = JSON.parse(storedExploring);
        stage = 'exploring';
      } catch (e) {
        console.error('Error parsing exploring data:', e);
      }
    }

    if (storedNarrowing) {
      try {
        narrowingData = JSON.parse(storedNarrowing);
        stage = 'narrowing';
      } catch (e) {
        console.error('Error parsing narrowing data:', e);
      }
    }

    if (storedTiming) {
      try {
        timingData = JSON.parse(storedTiming);
        stage = 'timing';
      } catch (e) {
        console.error('Error parsing timing data:', e);
      }
    }

    // If localStorage is empty, fall back to URL params (for single stage testing)
    if (Object.keys(exploringData).length === 0 && Object.keys(narrowingData).length === 0 && Object.keys(timingData).length === 0) {
      const params: Record<string, string | string[]> = {};
      stage = searchParams.get('stage') || 'exploring';

      searchParams.forEach((value, key) => {
        if (key !== 'stage') {
          params[key] = value;
        }
      });

      // Assign params to the appropriate stage
      if (stage === 'exploring') {
        exploringData = params;
      } else if (stage === 'narrowing') {
        narrowingData = params;
      } else if (stage === 'timing') {
        timingData = params;
      } else {
        exploringData = params; // default to exploring
        stage = 'exploring';
      }
    }

    setCompletedStage(stage);

    // Map quiz answers to backend filters
    const filters = mapQuizAnswersToFilters(exploringData, narrowingData, timingData);
    setBackendFilters(filters);

    setLoading(false);
  }, [searchParams]);

  const handleRetakeQuiz = () => {
    // Clear localStorage and restart quiz
    localStorage.removeItem('quiz_exploring_answers');
    localStorage.removeItem('quiz_narrowing_answers');
    localStorage.removeItem('quiz_timing_answers');
    router.push('/quiz');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF6ED] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Generating your personalized recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF6ED]">
      {/* Header */}
      <QuizNavbar>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-orange-700 border-orange-300">
            Quiz Complete
          </Badge>
        </div>
      </QuizNavbar>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <div className="flex items-center justify-start mb-8">
            <Link
              href="/quiz"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Quiz Overview</span>
            </Link>
          </div>

          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Filter className="w-4 h-4" />
              Quiz Complete - Filters Generated
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Safari Search Filters
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Based on your quiz answers, we&apos;ve generated search filters that will be used to find your perfect safari when the backend API is ready.
            </p>
          </div>

          {/* Quiz Summary */}
          <Card className="mb-12 border-2 border-orange-200 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Your Quiz Summary</CardTitle>
              <CardDescription>Here&apos;s what you told us about your ideal safari</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                {completedStage === 'exploring' && (
                  <div className="text-center">
                    <div className="bg-orange-100 text-orange-700 p-3 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Compass className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Exploring Stage</h3>
                    <p className="text-sm text-gray-600">
                      Travel style, group preferences, and activity interests
                    </p>
                  </div>
                )}
                {completedStage === 'narrowing' && (
                  <div className="text-center">
                    <div className="bg-orange-100 text-orange-700 p-3 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Narrowing Stage</h3>
                    <p className="text-sm text-gray-600">
                      Destination preferences and specific interests
                    </p>
                  </div>
                )}
                {completedStage === 'timing' && (
                  <div className="text-center">
                    <div className="bg-teal-100 text-teal-700 p-3 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Timing Stage</h3>
                    <p className="text-sm text-gray-600">Budget, schedule, and booking preferences</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Backend Filters Display */}
          <Card className="mb-12 border-2 border-teal-200 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-teal-600" />
                    Your Search Filters
                  </CardTitle>
                  <CardDescription>
                    These filters will be sent to our backend to find your perfect safari
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  {showFilters ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            {showFilters && (
              <CardContent>
                <div className="space-y-6">
                  {formatFiltersForDisplay(backendFilters).map((section, idx) => (
                    <div key={idx} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        {section.category === 'Safari Preferences' && (
                          <Compass className="w-5 h-5 text-orange-600" />
                        )}
                        {section.category === 'Destination & Experiences' && (
                          <MapPin className="w-5 h-5 text-orange-600" />
                        )}
                        {section.category === 'Timing & Logistics' && (
                          <Clock className="w-5 h-5 text-teal-600" />
                        )}
                        {section.category}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm font-medium text-gray-700 mb-2">{item.label}</div>
                            <div className="flex flex-wrap gap-2">
                              {Array.isArray(item.value) ? (
                                item.value.map((val, valIdx) => (
                                  <Badge
                                    key={valIdx}
                                    variant="secondary"
                                    className="bg-teal-100 text-teal-800 border-0"
                                  >
                                    {val}
                                  </Badge>
                                ))
                              ) : (
                                <Badge variant="secondary" className="bg-teal-100 text-teal-800 border-0">
                                  {item.value}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* JSON View Toggle */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2">
                      <span>View Raw Filter Data (for Backend API)</span>
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-green-400 font-mono">
                        {JSON.stringify(backendFilters, null, 2)}
                      </pre>
                    </div>
                  </details>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Next Steps - API Integration Notice */}
          <Card className="mt-12 border-2 border-teal-200 bg-teal-50/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Send className="w-5 h-5 text-teal-600" />
                Ready to Search for Your Perfect Safari?
              </CardTitle>
              <CardDescription>
                These filters are ready to be sent to the backend API to find matching safari tours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-teal-200">
                  <h4 className="font-semibold text-gray-900 mb-2">API Endpoint (Coming Soon)</h4>
                  <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    POST /api/tours/search
                  </code>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                    disabled
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Search Tours (API Not Implemented)
                  </Button>
                  <Button variant="outline" onClick={handleRetakeQuiz}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Button>
                  <Link href="/quiz">
                    <Button variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Quiz
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function QuizResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF6ED] flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-orange-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading your quiz results...</p>
          </div>
        </div>
      }
    >
      <QuizResultsContent />
    </Suspense>
  );
}
