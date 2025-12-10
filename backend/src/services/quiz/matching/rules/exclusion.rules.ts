export const HARD_EXCLUSIONS = {
  persona: {
    solo: ['persona:couple'],
    family: ['persona:couple'],
    friends: ['persona:couple'],
  },
  duration: {
    'duration:short': (days: number) => days > 6,
    'duration:standard': (days: number) => days > 12,
    'duration:extended': (days: number) => days > 20,
  },
  budget: {
    'budget:budget': ['budget:luxury-high-end', 'budget:luxury'],
    'budget:midrange': ['budget:luxury-high-end'],
  },
  pace: {
    'pace:relaxed': ['pace:fast', 'activity:trekking', 'activity:hiking'],
  },
};
