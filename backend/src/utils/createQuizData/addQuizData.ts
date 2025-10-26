import { PrismaClient } from '@prisma/client';
import { questions, QuestionOption } from './data/quizQuestions.js';

const prisma = new PrismaClient();

interface StageData {
  name: string;
  description: string;
}

async function main(): Promise<void> {
  console.log('Seeding Smart Quiz  Data...');

  // QUIZ STAGES
  const stages: StageData[] = [
    { name: 'Exploring', description: 'Understand your safari personality and preferences' },
    { name: 'Narrowing', description: 'Refine your region, budget, and activity preferences' },
    { name: 'Timing', description: 'Pick the right time for your perfect safari' },
  ];

  for (const stage of stages) {
    await prisma.quizStage.upsert({
      where: { name: stage.name },
      update: {},
      create: stage,
    });
  }

  console.log('Quiz stages ensured');

  const getStageId = async (name: string): Promise<number> => {
    const stage = await prisma.quizStage.findUnique({ where: { name } });
    if (!stage) throw new Error(`QuizStage not found: ${name}`);
    return stage.id;
  };

  const getCategoryId = async (name: string): Promise<number> => {
    const category = await prisma.category.findUnique({ where: { name } });
    if (!category) throw new Error(`Category not found: ${name}`);
    return category.id;
  };

  // Insert questions and options and insight nudges
  for (const q of questions) {
    const stageId = await getStageId(q.stage);
    const createdQuestion = await prisma.quizQuestion.upsert({
      where: { orderIndex: q.orderIndex },
      update: {},
      create: {
        question: q.question,
        orderIndex: q.orderIndex,
        description: q.key,
        stageId,
        options: {
          create: await Promise.all(
            q.options.map(async (opt: QuestionOption, idx: number) => ({
              optionText: opt.label,
              categoryId: await getCategoryId(opt.category.split(':')[1]),
              orderIndex: idx + 1,
            })),
          ),
        },
      },
    });

    // Create insight nudges for each option
    for (const opt of q.options) {
      await prisma.quizInsight.create({
        data: {
          questionId: createdQuestion.id,
          insightText: opt.nudge,
          contextType: 'nudge',
        },
      });
    }

    console.log('Questions, Options, and Nudges seeded');
    console.log('Smart Quiz Data Seeded Successfully');
  }
}

main()
  .catch((err: Error) => {
    console.error('Quiz data seed failed:', err);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
