export interface QuestionOption {
  value: string;
  label: string;
  category: string;
  nudge: string;
}

export interface QuestionData {
  stage: string;
  question: string;
  key: string;
  orderIndex: number;
  options: QuestionOption[];
}

// QUESTIONS
export const questions: QuestionData[] = [
  // === EXPLORING STAGE ===
  {
    stage: 'Exploring',
    question: "Who's joining you on this adventure?",
    key: 'tripType',
    orderIndex: 1,
    options: [
      {
        value: 'solo',
        label: 'Solo Adventure',
        category: 'persona:solo',
        nudge:
          'Solo travelers get maximum flexibility and can focus entirely on their own interests. Perfect for wildlife photography and personal reflection.',
      },
      {
        value: 'couple',
        label: 'Romantic Getaway',
        category: 'persona:couple',
        nudge:
          'Couples enjoy intimate game drives and romantic sundowners. Many lodges offer special honeymoon packages and private dining experiences.',
      },
      {
        value: 'family',
        label: 'Family Trip',
        category: 'persona:family',
        nudge:
          "Family safaris focus on educational experiences and shorter game drives. We'll recommend lodges with family suites and child-friendly activities.",
      },
      {
        value: 'friends',
        label: 'Friends Group',
        category: 'persona:friends',
        nudge:
          "Group safaris are perfect for sharing costs and experiences. You'll get group discounts and social campfire moments.",
      },
    ],
  },
  {
    stage: 'Exploring',
    question: 'What kind of experience are you after?',
    key: 'vibe',
    orderIndex: 2,
    options: [
      {
        value: 'relaxed',
        label: 'Relaxed & Peaceful',
        category: 'style:relaxed',
        nudge: 'Relaxed safaris focus on spa treatments, yoga, and tranquil observation.',
      },
      {
        value: 'adventurous',
        label: 'Adventurous & Active',
        category: 'style:adventurous',
        nudge: 'Adventure safaris include walking safaris, balloon rides, and cultural visits.',
      },
      {
        value: 'educational',
        label: 'Educational & Cultural',
        category: 'style:educational',
        nudge: 'Educational safaris feature expert guides, village visits, and conservation talks.',
      },
      {
        value: 'wildlife',
        label: 'Wildlife-Focused',
        category: 'style:wildlife-focused',
        nudge: 'Wildlife-focused safaris maximize animal encounters and photography.',
      },
    ],
  },
  {
    stage: 'Exploring',
    question: "What's your safari experience level?",
    key: 'experience',
    orderIndex: 3,
    options: [
      {
        value: 'first-time',
        label: 'First Safari',
        category: 'experience:first-time',
        nudge: "Perfect for beginners. We'll help you choose easy logistics and great guides.",
      },
      {
        value: 'some',
        label: 'Some Experience',
        category: 'experience:some',
        nudge: 'Ready for deeper exploration? Try new regions or unique activities.',
      },
      {
        value: 'experienced',
        label: 'Safari Veteran',
        category: 'experience:experienced',
        nudge: 'Time for remote destinations and specialized wildlife experiences.',
      },
      {
        value: 'expert',
        label: 'Safari Expert',
        category: 'experience:expert',
        nudge: 'You can handle challenging terrains and niche wildlife expeditions.',
      },
    ],
  },
  {
    stage: 'Exploring',
    question: "What's your comfort preference?",
    key: 'comfort',
    orderIndex: 4,
    options: [
      {
        value: 'budget',
        label: 'Budget-Friendly',
        category: 'budget:budget',
        nudge: 'Budget safaris offer authentic bush experiences with camping and basic lodges.',
      },
      {
        value: 'midrange',
        label: 'Mid-Range Comfort',
        category: 'budget:midrange',
        nudge: 'Balance comfort and value with quality lodges and good meals.',
      },
      {
        value: 'luxury',
        label: 'Luxury Experience',
        category: 'budget:luxury',
        nudge: 'Premium lodges, private guides, and gourmet dining await.',
      },
      {
        value: 'ultra-luxury',
        label: 'Ultra-Luxury',
        category: 'budget:ultra-luxury',
        nudge: 'Private aircraft, exclusive camps, and world-class service.',
      },
    ],
  },
  {
    stage: 'Exploring',
    question: 'What matters most to you?',
    key: 'priorities',
    orderIndex: 5,
    options: [
      {
        value: 'wildlife',
        label: 'Best Wildlife',
        category: 'interest:wildlife',
        nudge: 'Focus on top wildlife density destinations and guides.',
      },
      {
        value: 'photography',
        label: 'Photography',
        category: 'interest:photography',
        nudge: 'Access the best lighting and vehicle setups for photography.',
      },
      {
        value: 'culture',
        label: 'Culture',
        category: 'interest:culture',
        nudge: 'Engage with local traditions and communities.',
      },
      {
        value: 'relaxation',
        label: 'Relaxation',
        category: 'interest:relaxation',
        nudge: 'Emphasis on comfort, spa, and downtime.',
      },
    ],
  },
  {
    stage: 'Exploring',
    question: 'How long is your ideal safari?',
    key: 'duration',
    orderIndex: 6,
    options: [
      {
        value: 'short',
        label: 'Quick Getaway (3-5 days)',
        category: 'duration:short',
        nudge: 'Perfect for a single park experience with dense wildlife.',
      },
      {
        value: 'standard',
        label: 'Standard Safari (6-8 days)',
        category: 'duration:standard',
        nudge: 'Balanced itinerary with time for multiple parks.',
      },
      {
        value: 'extended',
        label: 'Extended Adventure (9-14 days)',
        category: 'duration:extended',
        nudge: 'Immersive safaris covering multiple ecosystems.',
      },
      {
        value: 'comprehensive',
        label: 'Grand Safari (15+ days)',
        category: 'duration:comprehensive',
        nudge: 'Ultimate exploration across regions and activities.',
      },
    ],
  },

  // === NARROWING STAGE ===
  {
    stage: 'Narrowing',
    question: 'Which region are you interested in?',
    key: 'region',
    orderIndex: 7,
    options: [
      {
        value: 'east-africa',
        label: 'East Africa',
        category: 'region:east-africa',
        nudge: 'East Africa is iconic for the Great Migration and open savannas.',
      },
      {
        value: 'southern-africa',
        label: 'Southern Africa',
        category: 'region:southern-africa',
        nudge: 'Southern Africa combines wildlife, wine, and adventure.',
      },
      {
        value: 'central-africa',
        label: 'Central Africa',
        category: 'region:central-africa',
        nudge: 'Untamed wilderness, gorillas, and rainforest safaris.',
      },
      {
        value: 'multiple',
        label: 'Multiple Regions',
        category: 'region:multiple',
        nudge: 'Cross-region safaris combine diverse ecosystems.',
      },
    ],
  },
  {
    stage: 'Narrowing',
    question: "What's your approximate budget per person?",
    key: 'budget',
    orderIndex: 8,
    options: [
      {
        value: 'economy',
        label: 'Economy (<$200)',
        category: 'budget:economy',
        nudge: 'Great for budget-conscious travelers seeking authentic experiences.',
      },
      {
        value: 'standard',
        label: 'Standard ($200-$500)',
        category: 'budget:standard',
        nudge: 'Balanced options offering comfort and quality.',
      },
      {
        value: 'premium',
        label: 'Premium ($500-1000)',
        category: 'budget:premium',
        nudge: 'Higher-end lodges and exclusive activities.',
      },
      {
        value: 'luxury',
        label: 'Luxury (>$1,000)',
        category: 'budget:luxury',
        nudge: 'Top-tier accommodations and personalized services.',
      },
    ],
  },
  {
    stage: 'Narrowing',
    question: "What's your daily safari pace?",
    key: 'pace',
    orderIndex: 9,
    options: [
      {
        value: 'slow',
        label: 'Slow & Scenic',
        category: 'pace:slow',
        nudge: 'Perfect for those who enjoy relaxation and deep immersion.',
      },
      {
        value: 'moderate',
        label: 'Moderate',
        category: 'pace:moderate',
        nudge: 'Balanced rhythm of exploration and rest.',
      },
      {
        value: 'packed',
        label: 'Action-Packed',
        category: 'pace:packed',
        nudge: 'Ideal for travelers who want to maximize every day.',
      },
      {
        value: 'flexible',
        label: 'Flexible',
        category: 'pace:flexible',
        nudge: 'Go with the flow depending on the moment and wildlife sightings.',
      },
    ],
  },
  {
    stage: 'Narrowing',
    question: 'What type of accommodation do you prefer?',
    key: 'accommodation',
    orderIndex: 10,
    options: [
      {
        value: 'tented-camp',
        label: 'Tented Camp',
        category: 'accommodation:tented-camp',
        nudge: 'Authentic bush experience with open-air tents.',
      },
      {
        value: 'lodge',
        label: 'Lodge',
        category: 'accommodation:lodge',
        nudge: 'Comfortable rooms with amenities and services.',
      },
      {
        value: 'mobile-camp',
        label: 'Mobile Camp',
        category: 'accommodation:mobile-camp',
        nudge: 'Move with the wildlife in seasonal camps.',
      },
      {
        value: 'villa',
        label: 'Private Villa',
        category: 'accommodation:villa',
        nudge: 'Exclusive use of a villa with personalized services.',
      },
    ],
  },
  {
    stage: 'Narrowing',
    question: "Any specific activities you're interested in?",
    key: 'activities',
    orderIndex: 11,
    options: [
      {
        value: 'game-drives',
        label: 'Game Drives',
        category: 'activity:game-drives',
        nudge:
          'Classic guided safaris in open vehicles offering the best chance to spot the Big Five and other wildlife.',
      },
      {
        value: 'walking-safari',
        label: 'Walking Safari',
        category: 'activity:walking-safari',
        nudge: 'Get closer to nature on foot with expert guides.',
      },
      {
        value: 'cultural-visit',
        label: 'Cultural Visit',
        category: 'activity:cultural-visit',
        nudge: 'Engage with local communities and traditions.',
      },
      {
        value: 'photography-tour',
        label: 'Photography Tour',
        category: 'activity:photography-tour',
        nudge: 'Specialized tours focusing on capturing wildlife moments.',
      },
    ],
  },
  {
    stage: 'Narrowing',
    question: 'How long do you plan to travel?',
    key: 'duration',
    orderIndex: 12,
    options: [
      {
        value: '3-5',
        label: '3–5 Days (Quick Getaway)',
        category: 'duration:short',
        nudge:
          'Perfect for a short escape — focus on one major park with plenty of wildlife and minimal transfers.',
      },
      {
        value: '6-8',
        label: '6–8 Days (Classic Safari)',
        category: 'duration:standard',
        nudge:
          'Balanced adventure across 2–3 destinations with time for both exploration and relaxation.',
      },
      {
        value: '9-14',
        label: '9–14 Days (Extended Adventure)',
        category: 'duration:extended',
        nudge:
          'Ideal for travelers wanting a deeper dive into multiple regions, ecosystems, and activities.',
      },
      {
        value: '15+',
        label: '15+ Days (Grand Safari)',
        category: 'duration:comprehensive',
        nudge:
          'Comprehensive journeys combining countries and habitats — the ultimate safari experience.',
      },
    ],
  },

  // === TIMING STAGE ===
  {
    stage: 'Timing',
    question: 'When do you plan to travel?',
    key: 'travelMonth',
    orderIndex: 13,
    options: [
      {
        value: 'jan-mar',
        label: 'January – March',
        category: 'season:jan-mar',
        nudge:
          'Green season in many regions — fewer crowds and excellent birding opportunities, though occasional rain.',
      },
      {
        value: 'apr-jun',
        label: 'April – June',
        category: 'season:apr-jun',
        nudge:
          'Transition into the dry season — great value months with lush landscapes and emerging wildlife activity.',
      },
      {
        value: 'jul-sep',
        label: 'July – September (Peak Season)',
        category: 'season:jul-sep',
        nudge:
          'Prime wildlife viewing and the Great Migration — plan early, as availability is limited and prices higher.',
      },
      {
        value: 'oct-dec',
        label: 'October – December',
        category: 'season:oct-dec',
        nudge:
          'Post-peak season with young wildlife, dramatic skies, and lower prices — a great mix of experience and value.',
      },
    ],
  },
  {
    stage: 'Timing',
    question: 'How flexible are your travel dates?',
    key: 'flexibility',
    orderIndex: 14,
    options: [
      {
        value: 'fixed',
        label: 'Fixed Dates',
        category: 'flex:fixed',
        nudge: "We'll find the best safari options available for your exact travel window.",
      },
      {
        value: 'somewhat',
        label: 'Somewhat Flexible',
        category: 'flex:somewhat',
        nudge:
          'A bit of flexibility can help secure better prices or improved wildlife conditions.',
      },
      {
        value: 'very',
        label: 'Very Flexible',
        category: 'flex:very',
        nudge: 'More date flexibility opens access to peak wildlife periods and limited lodges.',
      },
      {
        value: 'completely',
        label: 'Completely Flexible',
        category: 'flex:completely',
        nudge: 'You can plan around perfect weather, wildlife migrations, and best-value periods.',
      },
    ],
  },
  {
    stage: 'Timing',
    question: "What's your preference regarding crowds?",
    key: 'crowds',
    orderIndex: 15,
    options: [
      {
        value: 'avoid',
        label: 'Prefer Low Crowds',
        category: 'crowd:avoid',
        nudge: "Ideal for privacy and tranquility — we'll recommend hidden gems and smaller camps.",
      },
      {
        value: 'dontmind',
        label: "Don't Mind Crowds",
        category: 'crowd:dontmind',
        nudge:
          "Perfect if you value convenience and don't mind a busier atmosphere in popular parks.",
      },
      {
        value: 'enjoy',
        label: 'Enjoy Peak Energy',
        category: 'crowd:enjoy',
        nudge: 'Peak season energy brings vibrant lodges and exciting wildlife encounters.',
      },
      {
        value: 'social',
        label: 'Social & Lively',
        category: 'crowd:social',
        nudge:
          'Join group activities, meet fellow travelers, and enjoy a lively social experience.',
      },
    ],
  },
  {
    stage: 'Timing',
    question: "What's your top priority when choosing travel dates?",
    key: 'priority',
    orderIndex: 16,
    options: [
      {
        value: 'wildlife',
        label: 'Wildlife First',
        category: 'timing:wildlife',
        nudge: "We'll optimize your trip for prime wildlife activity and seasonal migrations.",
      },
      {
        value: 'weather',
        label: 'Comfortable Weather',
        category: 'timing:weather',
        nudge: 'Prioritize mild temperatures and pleasant conditions for a smooth safari.',
      },
      {
        value: 'photography',
        label: 'Photography Conditions',
        category: 'timing:photography',
        nudge: 'Plan for golden light, clear skies, and striking wildlife backdrops.',
      },
      {
        value: 'value',
        label: 'Best Value',
        category: 'timing:value',
        nudge: 'Balance good wildlife viewing with attractive prices and lower demand.',
      },
    ],
  },
  {
    stage: 'Timing',
    question: 'How much weather variation are you comfortable with?',
    key: 'weather',
    orderIndex: 17,
    options: [
      {
        value: 'rain-ok',
        label: 'Rain Okay',
        category: 'weather:rain-ok',
        nudge: "Occasional showers don't bother you — enjoy lush landscapes and dramatic skies.",
      },
      {
        value: 'some-rain',
        label: 'Light Rain Okay',
        category: 'weather:some-rain',
        nudge: 'A little rain is fine as long as you can still enjoy activities comfortably.',
      },
      {
        value: 'dry-only',
        label: 'Prefer Dry',
        category: 'weather:dry-only',
        nudge: 'You prefer dry, predictable conditions for maximum comfort and easy logistics.',
      },
      {
        value: 'sunshine-only',
        label: 'Sunshine Only',
        category: 'weather:sunshine-only',
        nudge: 'You want guaranteed sunshine — perfect for photography and relaxation.',
      },
    ],
  },
];
