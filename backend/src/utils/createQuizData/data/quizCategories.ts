export interface Category {
  name: string;
  description: string;
  conflictGroupName?: string; // cleaner than passing IDs
}

// create categories
export const CATEGORIES: Category[] = [
  // Tour categories
  { name: 'Adventure', description: 'Action-packed safaris' },
  { name: 'Relaxed', description: 'Slow pace and comfort' },
  {
    name: 'Family',
    description: 'Great for families with kids',
    conflictGroupName: 'Travel Style',
  },
  { name: 'Luxury', description: 'High-end lodges and comfort' },
  { name: 'Budget', description: 'Affordable yet authentic safaris' },
  { name: 'Romantic', description: 'Perfect for couples', conflictGroupName: 'Travel Style' },
  { name: 'Wildlife', description: 'Focus on animals and nature' },
  { name: 'Photography', description: 'For shutterbugs and pros' },
  { name: 'Migration', description: 'The Great Wildebeest Migration' },
  { name: 'Culture', description: 'Local traditions and people' },
  { name: 'Small Groups', description: '2-8 people', conflictGroupName: 'Group Size' },
  { name: 'Large Groups', description: '9+ people', conflictGroupName: 'Group Size' },

  // Tag categories for quiz system
  {
    name: 'persona',
    description: 'Travel companion type',
    conflictGroupName: 'Persona Exclusivity',
  },
  { name: 'style', description: 'Safari style preference' },
  { name: 'experience-level', description: 'Safari experience level' },
  { name: 'budget', description: 'Budget range' },
  { name: 'interest', description: 'Primary interests' },
  { name: 'wildlife', description: 'Specific wildlife focus' },
  { name: 'duration', description: 'Trip duration' },
  { name: 'pace', description: 'Activity pace' },
  { name: 'accommodation', description: 'Accommodation type' },
  { name: 'activity', description: 'Activity type' },
  { name: 'region', description: 'Geographic region' },
  { name: 'season', description: 'Travel season' },
  { name: 'crowd-preference', description: 'Crowd tolerance' },
  { name: 'timing-priority', description: 'Timing factors' },
  { name: 'weather-tolerance', description: 'Weather preferences' },
  { name: 'planning-flexibility', description: 'Date flexibility' },
];
