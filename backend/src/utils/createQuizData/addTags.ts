import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Tag {
  key: string;
  label: string;
  category: string;
}

const tags: Tag[] = [
  { key: 'persona:solo', label: 'Solo Traveler', category: 'persona' },
  { key: 'persona:couple', label: 'Couple', category: 'persona' },
  { key: 'persona:family', label: 'Family', category: 'persona' },
  { key: 'persona:friends', label: 'Friends Group', category: 'persona' },
  { key: 'style:relaxed', label: 'Relaxed', category: 'style' },
  { key: 'style:adventurous', label: 'Adventurous', category: 'style' },
  { key: 'style:educational', label: 'Educational & Cultural', category: 'style' },
  { key: 'style:wildlife-focused', label: 'Wildlife-Focused', category: 'style' },
  { key: 'experience:first-time', label: 'First-time', category: 'experience-level' },
  { key: 'experience:some', label: 'Some Experience', category: 'experience-level' },
  { key: 'experience:experienced', label: 'Experienced', category: 'experience-level' },
  { key: 'experience:expert', label: 'Expert', category: 'experience-level' },
  { key: 'budget:budget', label: 'Budget', category: 'budget' },
  { key: 'budget:midrange', label: 'Midrange', category: 'budget' },
  { key: 'budget:luxury', label: 'Luxury', category: 'budget' },
  { key: 'budget:ultra-luxury', label: 'Ultra-Luxury', category: 'budget' },
  { key: 'interest:wildlife', label: 'Wildlife', category: 'interest' },
  { key: 'interest:photography', label: 'Photography', category: 'interest' },
  { key: 'interest:culture', label: 'Culture', category: 'interest' },
  { key: 'interest:relaxation', label: 'Relaxation', category: 'interest' },
  { key: 'interest:conservation', label: 'Conservation', category: 'interest' },
  { key: 'interest:desert', label: 'Desert', category: 'interest' },
  { key: 'interest:water-safari', label: 'Water Safari', category: 'interest' },
  { key: 'interest:beach', label: 'Beach', category: 'interest' },
  { key: 'interest:self-drive', label: 'Self-Drive', category: 'interest' },
  { key: 'wildlife:big5', label: 'Big Five', category: 'wildlife' },
  { key: 'wildlife:migration', label: 'Great Migration', category: 'wildlife' },
  { key: 'wildlife:elephants', label: 'Elephants', category: 'wildlife' },
  { key: 'wildlife:rhinos', label: 'Rhinos', category: 'wildlife' },
  { key: 'wildlife:chimps', label: 'Chimpanzees', category: 'wildlife' },
  { key: 'wildlife:whales', label: 'Whales', category: 'wildlife' },
  { key: 'wildlife:predators', label: 'Predators', category: 'wildlife' },
  { key: 'wildlife:wild-dogs', label: 'Wild Dogs', category: 'wildlife' },
  { key: 'duration:short', label: '3-5 days', category: 'duration' },
  { key: 'duration:standard', label: '6-8 days', category: 'duration' },
  { key: 'duration:extended', label: '9-14 days', category: 'duration' },
  { key: 'duration:comprehensive', label: '15+ days', category: 'duration' },
  { key: 'pace:slow', label: 'Slow & Scenic', category: 'pace' },
  { key: 'pace:moderate', label: 'Moderate', category: 'pace' },
  { key: 'pace:packed', label: 'Action-Packed', category: 'pace' },
  { key: 'pace:flexible', label: 'Flexible', category: 'pace' },
  { key: 'accommodation:camping', label: 'Camping', category: 'accommodation' },
  { key: 'accommodation:tented-camp', label: 'Tented Camp', category: 'accommodation' },
  { key: 'accommodation:lodge', label: 'Lodge', category: 'accommodation' },
  { key: 'accommodation:luxury-camp', label: 'Luxury Camp', category: 'accommodation' },
  { key: 'activity:game-drives', label: 'Game Drives', category: 'activity' },
  { key: 'activity:walking-safaris', label: 'Walking Safaris', category: 'activity' },
  { key: 'activity:cultural-visits', label: 'Cultural Visits', category: 'activity' },
  { key: 'activity:photography', label: 'Photography', category: 'activity' },
  { key: 'activity:balloon', label: 'Balloon Safari', category: 'activity' },
  { key: 'activity:boat', label: 'Boat Safari', category: 'activity' },
  { key: 'region:east-africa', label: 'East Africa', category: 'region' },
  { key: 'region:southern-africa', label: 'Southern Africa', category: 'region' },
  { key: 'region:central-africa', label: 'Central Africa', category: 'region' },
  { key: 'region:multiple', label: 'Multiple Regions', category: 'region' },
  { key: 'season:jan-mar', label: 'Jan-Mar', category: 'season' },
  { key: 'season:apr-jun', label: 'Apr-Jun', category: 'season' },
  { key: 'season:jul-sep', label: 'Jul-Sep (Peak)', category: 'season' },
  { key: 'season:oct-dec', label: 'Oct-Dec', category: 'season' },
  { key: 'crowd:avoid', label: 'Prefer Low Crowds', category: 'crowd-preference' },
  { key: 'crowd:dontmind', label: "Don't Mind Crowds", category: 'crowd-preference' },
  { key: 'crowd:enjoy', label: 'Enjoy Peak Energy', category: 'crowd-preference' },
  { key: 'crowd:social', label: 'Social & Lively', category: 'crowd-preference' },
  { key: 'timing:wildlife', label: 'Wildlife First', category: 'timing-priority' },
  { key: 'timing:weather', label: 'Comfortable Weather', category: 'timing-priority' },
  { key: 'timing:photography', label: 'Photography Conditions', category: 'timing-priority' },
  { key: 'timing:value', label: 'Best Value', category: 'timing-priority' },
  { key: 'weather:rain-ok', label: 'Rain Okay', category: 'weather-tolerance' },
  { key: 'weather:some-rain', label: 'Light Rain Okay', category: 'weather-tolerance' },
  { key: 'weather:dry-only', label: 'Prefer Dry', category: 'weather-tolerance' },
  { key: 'weather:sunshine-only', label: 'Sunshine Only', category: 'weather-tolerance' },
  { key: 'flex:fixed', label: 'Fixed Dates', category: 'planning-flexibility' },
  { key: 'flex:somewhat', label: 'Somewhat Flexible', category: 'planning-flexibility' },
  { key: 'flex:very', label: 'Very Flexible', category: 'planning-flexibility' },
  { key: 'flex:completely', label: 'Completely Flexible', category: 'planning-flexibility' },
];

async function main(): Promise<void> {
  console.log('Seeding all quiz and tour tags...');

  let successCount = 0;
  let errorCount = 0;

  for (const tag of tags) {
    try {
      console.log('Seeding all quiz and tour tags...');

      // Create or update the tag
      await prisma.tag.upsert({
        where: { key: tag.key },
        update: {
          label: tag.label,
          category: tag.category,
        },
        create: {
          key: tag.key,
          label: tag.label,
          category: tag.category,
        },
      });

      successCount++;
    } catch (error) {
      console.error(`Failed to seed tag ${tag.key}:`, error);
      errorCount++;
    }
  }

  console.log(`${successCount} tags seeded successfully`);
  if (errorCount > 0) {
    console.log(`${errorCount} tags failed to seed`);
  }
}

main()
  .catch((e: Error) => {
    console.error('Tag seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
