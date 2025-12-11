import { QuizAnswers } from './quiz-types';

export interface BackendFilters {
  // From exploring stage
  tripType?: string;
  safariStyle?: string;
  experienceLevel?: string;
  comfortBudget?: string;
  priorities?: string[];

  // From narrowing stage
  countries?: string[];
  wildlifeInterests?: string[];
  landscapePreferences?: string[];
  culturalExperiences?: string;
  accommodationStyle?: string;

  // From timing stage
  budgetRange?: string;
  travelMonths?: string[];
  tripDuration?: string;
  groupSize?: string;
  bookingTimeline?: string;
  flexibility?: string;
}

/**
 * Maps quiz answers from all three stages to backend filter format
 */
export function mapQuizAnswersToFilters(
  exploring: Record<string, string | string[]>,
  narrowing: Record<string, string | string[]>,
  timing: Record<string, string | string[]>
): BackendFilters {
  const filters: BackendFilters = {};

  // Map Exploring Stage (using actual quiz keys)
  if (exploring['tripType']) {
    filters.tripType = exploring['tripType'] as string;
  }
  if (exploring['vibe']) {
    filters.safariStyle = exploring['vibe'] as string;
  }
  if (exploring['experience']) {
    filters.experienceLevel = exploring['experience'] as string;
  }
  if (exploring['comfort']) {
    filters.comfortBudget = exploring['comfort'] as string;
  }
  if (exploring['priorities']) {
    filters.priorities = Array.isArray(exploring['priorities'])
      ? exploring['priorities']
      : [exploring['priorities'] as string];
  }
  if (exploring['duration']) {
    filters.tripDuration = exploring['duration'] as string;
  }

  // Map Narrowing Stage (using actual quiz keys)
  if (narrowing['region']) {
    filters.countries = Array.isArray(narrowing['region'])
      ? narrowing['region']
      : [narrowing['region'] as string];
  }
  if (narrowing['budget']) {
    filters.budgetRange = narrowing['budget'] as string;
  }
  if (narrowing['pace']) {
    filters.safariStyle = narrowing['pace'] as string;
  }
  if (narrowing['accommodation']) {
    filters.accommodationStyle = narrowing['accommodation'] as string;
  }
  if (narrowing['activities']) {
    filters.wildlifeInterests = Array.isArray(narrowing['activities'])
      ? narrowing['activities']
      : [narrowing['activities'] as string];
  }

  // Map Timing Stage (using actual quiz keys)
  if (timing['timing']) {
    filters.travelMonths = Array.isArray(timing['timing'])
      ? timing['timing']
      : [timing['timing'] as string];
  }
  if (timing['flexibility']) {
    filters.flexibility = timing['flexibility'] as string;
  }
  if (timing['crowds']) {
    filters.culturalExperiences = timing['crowds'] as string;
  }
  if (timing['priority']) {
    filters.priorities = Array.isArray(timing['priority'])
      ? timing['priority']
      : [timing['priority'] as string];
  }
  if (timing['weather']) {
    filters.landscapePreferences = Array.isArray(timing['weather'])
      ? timing['weather']
      : [timing['weather'] as string];
  }

  return filters;
}

/**
 * Formats filters for display in a human-readable format
 */
export function formatFiltersForDisplay(filters: BackendFilters): {
  category: string;
  items: { label: string; value: string | string[] }[];
}[] {
  const formatted: {
    category: string;
    items: { label: string; value: string | string[] }[];
  }[] = [];

  // Exploring Stage Filters
  const exploringItems: { label: string; value: string | string[] }[] = [];
  if (filters.tripType) {
    exploringItems.push({
      label: 'Trip Type',
      value: formatValue(filters.tripType),
    });
  }
  if (filters.safariStyle) {
    exploringItems.push({
      label: 'Safari Style',
      value: formatValue(filters.safariStyle),
    });
  }
  if (filters.experienceLevel) {
    exploringItems.push({
      label: 'Experience Level',
      value: formatValue(filters.experienceLevel),
    });
  }
  if (filters.comfortBudget) {
    exploringItems.push({
      label: 'Comfort & Budget',
      value: formatValue(filters.comfortBudget),
    });
  }
  if (filters.priorities && filters.priorities.length > 0) {
    exploringItems.push({
      label: 'Priorities',
      value: filters.priorities.map(formatValue),
    });
  }
  if (exploringItems.length > 0) {
    formatted.push({ category: 'Safari Preferences', items: exploringItems });
  }

  // Narrowing Stage Filters
  const narrowingItems: { label: string; value: string | string[] }[] = [];
  if (filters.countries && filters.countries.length > 0) {
    narrowingItems.push({
      label: 'Preferred Countries',
      value: filters.countries.map(formatValue),
    });
  }
  if (filters.wildlifeInterests && filters.wildlifeInterests.length > 0) {
    narrowingItems.push({
      label: 'Wildlife Interests',
      value: filters.wildlifeInterests.map(formatValue),
    });
  }
  if (filters.landscapePreferences && filters.landscapePreferences.length > 0) {
    narrowingItems.push({
      label: 'Landscape Preferences',
      value: filters.landscapePreferences.map(formatValue),
    });
  }
  if (filters.culturalExperiences) {
    narrowingItems.push({
      label: 'Cultural Experiences',
      value: formatValue(filters.culturalExperiences),
    });
  }
  if (filters.accommodationStyle) {
    narrowingItems.push({
      label: 'Accommodation Style',
      value: formatValue(filters.accommodationStyle),
    });
  }
  if (narrowingItems.length > 0) {
    formatted.push({ category: 'Destination & Experiences', items: narrowingItems });
  }

  // Timing Stage Filters
  const timingItems: { label: string; value: string | string[] }[] = [];
  if (filters.budgetRange) {
    timingItems.push({
      label: 'Budget Range',
      value: formatValue(filters.budgetRange),
    });
  }
  if (filters.travelMonths && filters.travelMonths.length > 0) {
    timingItems.push({
      label: 'Travel Timing',
      value: filters.travelMonths.map(formatValue),
    });
  }
  if (filters.tripDuration) {
    timingItems.push({
      label: 'Trip Duration',
      value: formatValue(filters.tripDuration),
    });
  }
  if (filters.groupSize) {
    timingItems.push({
      label: 'Group Size',
      value: formatValue(filters.groupSize),
    });
  }
  if (filters.bookingTimeline) {
    timingItems.push({
      label: 'Booking Timeline',
      value: formatValue(filters.bookingTimeline),
    });
  }
  if (filters.flexibility) {
    timingItems.push({
      label: 'Flexibility',
      value: formatValue(filters.flexibility),
    });
  }
  if (timingItems.length > 0) {
    formatted.push({ category: 'Timing & Logistics', items: timingItems });
  }

  return formatted;
}

/**
 * Formats a value by replacing hyphens with spaces and capitalizing words
 */
function formatValue(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
