import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const faqData = [
  {

    question: 'What makes Wandar different from other safari booking platforms?',
    answer: 'Wandar offers intelligent matching based on your travel persona, ensuring a personalized safari experience with verified partners.',
  },
  {
    question: 'Which countries does Wandar currently cover?',
    answer: 'We currently feature curated safari experiences in Kenya, Tanzania, South Africa, Botswana, and more coming soon.',

  },
  {
    question: 'How does Wandar actually make planning easier?',
    answer:
      'Wandar cuts through the noise. Instead of sifting through hundreds of tours, you get a curated shortlist that fits—and a prep guide that answers the questions most people open 10 tabs to figure out. Less second-guessing, more clarity.',
  },
  {
    question: 'Does Wandar charge any fees to users?',
    answer: 'No, Wandar is completely free to use for travelers. We earn through partner commissions, not from your pocket.',
  },
  {
    question: 'When will Wandar be available to the public?',
    answer: 'We are currently in beta. Join our waitlist to get early access when we launch publicly later this year.',

  },
];

const FaqLayout = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (

    <section id='faqs' className="py-16 px-4 sm:px-8 md:px-16 bg-[#fefdfc] text-neutral-900">
      <div className="text-center mb-12">
        <h3 className="text-md text-gray-400 mb-2 tracking-wide">— Questions Answered —</h3>
        <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-2">Everything you need to know about Wandar and planning your safari adventure.</p>

      </div>

      <div className='max-w-3xl mx-auto space-y-4'>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className='border-t border-[#D8B887] pt-6 pb-4 cursor-pointer transition-all'
            onClick={() => toggleIndex(index)}
          >
            <div className='flex justify-between items-start'>
              <h3 className='text-lg font-medium text-[#2E2E2E]'>{faq.question}</h3>
              <span className='text-[#C08B5C] mt-1'>
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </div>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <p className='text-sm text-gray-600 mt-3 pr-8'>{faq.answer}</p>
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
