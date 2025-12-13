# Quiz Implementation Step-by-Step Guide

## Overview
This guide provides a complete roadmap for implementing a travel quiz system that guides users through three stages (Exploring, Narrowing, Timing) to provide personalized safari recommendations. The quiz integrates with your existing app's hero section and navigation.

## Phase 1: Project Structure Setup

### Step 1: Create Quiz Directory Structure
```
app/quiz/
├── page.tsx                 # Quiz landing page
├── exploring/
│   └── page.tsx             # Exploring stage
├── narrowing/
│   └── page.tsx             # Narrowing stage
├── timing/
│   └── page.tsx             # Timing stage
└── results/
    └── page.tsx             # Results page
```

### Step 2: Define Core Data Types
Create `lib/quiz-types.ts`:
```typescript
export interface QuizAnswers {
  exploring: Record<string, string | string[]>;
  narrowing: Record<string, string | string[]>;
  timing: Record<string, string | string[]>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'range';
  options?: QuizOption[];
  required: boolean;
}

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface UserPersona {
  travelStyle: string;
  budgetRange: string;
  duration: string;
  preferences: string[];
}

export interface SafariRecommendation {
  id: string;
  name: string;
  location: string;
  matchScore: number;
  reasons: string[];
  highlights: string[];
}
```

## Phase 2: Quiz Landing Page Implementation

### Step 3: Create Quiz Landing Page
Update `app/quiz/page.tsx`:
- Import existing UI components (Button, Card, Badge, Progress)
- Import HamburgerMenu from components folder
- Create stage overview with three interactive cards
- Add navigation to first stage
- Include progress indicators and stage descriptions

### Step 4: Implement Navigation Logic
- Use Next.js router for navigation between stages
- Implement state management for quiz progress
- Add breadcrumb navigation for stage tracking

## Phase 3: Quiz Stages Implementation

### Step 5: Create Exploring Stage
Implement `app/quiz/exploring/page.tsx`:
- Define exploring questions in separate data file
- Create question display component with progress tracking
- Implement answer selection and validation
- Add navigation to next stage with answer persistence

**Sample Questions:**
- Travel style preferences (Adventure, Luxury, Cultural, Wildlife)
- Group composition (Solo, Couple, Family, Friends)
- Activity preferences (Game drives, Walking safaris, Photography)
- Accommodation preferences (Camps, Lodges, Mobile camping)

### Step 6: Create Narrowing Stage
Implement `app/quiz/narrowing/page.tsx`:
- Define destination-specific questions
- Create interactive option cards with images
- Implement multi-select functionality for preferences
- Add validation for required selections

**Sample Questions:**
- Preferred countries/regions
- Specific wildlife interests
- Landscape preferences (Savanna, Forest, Desert, Wetlands)
- Cultural experiences desired

### Step 7: Create Timing Stage
Implement `app/quiz/timing/page.tsx`:
- Create budget range selectors
- Implement date picker for travel timing
- Add duration selection options
- Include flexibility preferences

**Sample Questions:**
- Budget range per person
- Preferred travel months
- Trip duration (3-5 days, 1 week, 2+ weeks)
- Booking timeline preferences

## Phase 4: Results Processing & Display

### Step 8: Create Recommendation Engine
Create `lib/recommendation-engine.ts`:
- Implement scoring algorithm based on quiz answers
- Create persona matching logic
- Generate personalized safari recommendations
- Include reasoning for each recommendation

### Step 9: Implement Results Page
Create `app/quiz/results/page.tsx`:
- Display personalized recommendations using existing safari cards
- Show quiz summary with user's answers
- Add action buttons (restart, contact, view details)
- Implement sharing functionality

### Step 10: Create Answer Summary Component
- Build collapsible summary of all quiz answers
- Organize answers by stage with clear categorization
- Add edit functionality to modify specific answers

## Phase 5: State Management & Data Flow

### Step 11: Implement Quiz State Management
- Use React Context or localStorage for answer persistence
- Create quiz progress tracking
- Implement answer validation and error handling
- Add ability to navigate back and edit previous answers

### Step 12: Create Quiz Data Files
Create separate data files for each stage:
- `lib/quiz-data/exploring.ts` - Exploring stage questions
- `lib/quiz-data/narrowing.ts` - Narrowing stage questions
- `lib/quiz-data/timing.ts` - Timing stage questions

## Phase 6: Integration & Testing

### Step 13: Update Hero Section Button
- Ensure quiz button navigates to `/quiz`
- Add loading states and error handling
- Test navigation flow from hero to quiz completion

### Step 14: Component Integration
- Ensure all pages use existing UI components from `/components`
- Integrate HamburgerMenu consistently across all quiz pages
- Maintain design consistency with existing app styling

### Step 15: Testing & Optimization
- Test complete quiz flow on different devices
- Validate answer persistence across page navigation
- Ensure responsive design works on mobile and desktop
- Test recommendation accuracy with various answer combinations

## Implementation Priority

**High Priority (Core Functionality):**
1. Quiz landing page with stage navigation
2. Basic question display and answer collection
3. Simple results page with static recommendations
4. Navigation between stages

**Medium Priority (Enhanced Experience):**
1. Answer persistence and validation
2. Progress tracking and breadcrumbs
3. Dynamic recommendation engine
4. Answer summary and edit functionality

**Low Priority (Polish & Features):**
1. Advanced animations and transitions
2. Social sharing functionality
3. Quiz analytics and tracking
4. Advanced recommendation algorithms

## Key Implementation Notes

1. **Component Reuse**: Utilize existing UI components from `/components/ui/` for consistency
2. **Navigation**: Use Next.js App Router for seamless page transitions
3. **State Management**: Consider React Context for quiz state or localStorage for persistence
4. **Responsive Design**: Ensure mobile-first approach with touch-friendly interactions
5. **Performance**: Lazy load quiz stages and optimize for fast navigation
6. **Accessibility**: Include proper ARIA labels and keyboard navigation support
7. **Error Handling**: Implement graceful error states and validation messages
8. **Testing**: Test quiz flow thoroughly across different user paths and devices

## User Flow Summary

1. User clicks quiz button from hero section
2. Navigate to quiz landing page with stage overview
3. Complete Exploring stage (travel style questions)
4. Complete Narrowing stage (destination preferences)
5. Complete Timing stage (budget and schedule)
6. View personalized results with safari recommendations
7. Take action (restart, view details, or contact)

This implementation guide provides everything needed to build a complete, professional quiz system that integrates perfectly with your existing app architecture and delivers personalized safari recommendations to your users.