import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const faqData = [
  {
    question: 'Is Wandar free to use?',
    answer:
      'Yes. There’s no cost to take the quiz, view recommendations, or access our prep guide. We’re focused on helping you make confident, well-informed safari plans.',
  },
  {
    question: 'Which countries does Wandar currently cover?',
    answer:
      'Right now, Wandar focuses on safaris in South Africa, Kenya, Tanzania, and Botswana. These are among the most popular and diverse safari destinations in Africa—and where we’ve done the deepest curation so far. We plan to expand into more regions in the future.',
  },
  {
    question: 'How does Wandar actually make planning easier?',
    answer:
      'Wandar cuts through the noise. Instead of sifting through hundreds of tours, you get a curated shortlist that fits—and a prep guide that answers the questions most people open 10 tabs to figure out. Less second-guessing, more clarity.',
  },
  {
    question: 'How do you decide which safari tours to show me?',
    answer:
      'We handpick a smaller set of safaris that meet foundational quality standards—based on traveler reviews, transparency, itinerary clarity, and operator reputation. If it’s on Wandar, it’s been filtered with care.',
  },
  {
    question: 'How personalized are the safari matches?',
    answer:
      'Every recommendation is based on your quiz results—including travel style, comfort level, budget, and interests. Whether you’re a solo traveler, a honeymooner, or planning with family, we tailor suggestions to fit.',
  },
  {
    question: 'Is Wandar just for first-timers?',
    answer:
      'Not at all. We’re especially helpful if you’re early in the process, but even experienced safari-goers can use Wandar to narrow choices, cross-check tours, and discover regions they hadn’t considered before.',
  },
  {
    question: 'Will I see all available safaris in a region?',
    answer:
      'No—we don’t aim to list everything. Wandar focuses on quality over quantity. If we show it, it’s because we believe it’s worth considering.',
  },
  {
    question: 'Will I miss out on better deals by booking directly?',
    answer:
      'Nope. We link you to the official operator site, where you’ll usually find the most accurate pricing and availability—without added fees or markups.',
  },
  {
    question: 'Does Wandar help with flights, insurance, or accommodations?',
    answer:
      'Not right now. We’re focused on helping you choose the right safari first. Many operators include help with logistics, and we plan to expand into broader planning support in the future.',
  },
  {
    question: 'What does Wandar do with my quiz answers and data?',
    answer:
      'We only use your answers to improve your recommendations. We don’t sell your data or share your personal info with operators. Your privacy and trust matter to us.',
  },
];

const FaqLayout = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faqs" className="py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#fefdfc] text-[#2E2E2E]">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h3 className="text-sm text-gray-400 mb-2 tracking-wider uppercase">— Questions Answered —</h3>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-3 text-base sm:text-lg">
          Everything you need to know about Wandar and planning your safari adventure.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border-t border-[#D8B887] pt-6 pb-4 cursor-pointer"
            onClick={() => toggleIndex(index)}
            aria-expanded={openIndex === index}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg md:text-xl font-medium">{faq.question}</h3>
              <span className="text-[#C08B5C] mt-1 ml-4 shrink-0">
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </div>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm sm:text-base text-gray-600 mt-3 pr-4 sm:pr-8 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqLayout;
