import { useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQs: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]); // Track open indices

  const Faqs: FAQ[] = [
    {
      id: '1',
      question: 'What is KultureXplora?',
      answer:
        'KultureXplora is a platform designed to simplify your safari planning by gathering and organizing tour details from multiple safari operators and trusted review platforms. We provide you with easy access to prices, itineraries, and real traveler feedback, helping you find the best safari options without the hassle of endless research.',
    },
    {
      id: '2',
      question: 'How does KultureXplora help me find the perfect safari?',
      answer:
        'We collect details from various safari operators’ websites, such as prices, itineraries, and reviews, then aggregate and organize them in one place. This allows you to easily compare different options and find the safari that best suits your preferences and budget. Once you’ve made your choice, we connect you directly to the operator’s website to book.',
    },
    {
      id: '3',
      question: 'What makes KultureXplora different from other safari booking platforms?',
      answer:
        'KultureXplora sets itself apart by simplifying the research process. Instead of browsing multiple websites, we gather all the relevant information, including prices, itineraries, and reviews, in one place. This way, you can compare safaris side by side and make an informed decision without any middlemen involved.',
    },
    {
      id: '4',
      question: 'How do you gather the information for the safaris listed on the platform?',
      answer:
        'We scan multiple safari operator websites to gather real-time information on their safaris, including prices, itineraries, customer reviews, and experience types. We then standardize and organize the data for easy comparison.',
    },
    {
      id: '5',
      question: 'Do you handle the booking process for safaris?',
      answer:
        'No, we do not handle bookings directly on the platform. Once you have selected the safari you would like to book, we provide you with direct links to the operator’s website where you can complete the booking process.',
    },
    {
      id: '6',
      question: 'Are the safari details up-to-date?',
      answer:
        'Yes, we constantly scan operator websites to gather the latest tour details, including prices, itineraries, and reviews. We work to keep our listings as accurate and up-to-date as possible.',
    },
    {
      id: '7',
      question: 'How do you ensure the reviews are reliable?',
      answer:
        'We gather reviews from trusted platforms like TripAdvisor and Google, providing you with honest feedback from real travelers who have experienced the safaris. This allows you to make informed decisions based on firsthand accounts.',
    },
    {
      id: '8',
      question: 'Can I customize my safari on KultureXplora?',
      answer:
        'Currently, our platform aggregates a wide range of safaris based on general preferences, such as location, pricing, and experience type. While we don’t offer full customization of individual itineraries, we do offer personalized recommendations based on your preferences.',
    },
    {
      id: '9',
      question: 'How are safaris ranked on KultureXplora?',
      answer:
        'Safaris are sorted based on real traveler feedback, ratings, and popularity. This means you’ll see top-rated options highlighted, making it easier to choose safaris that align with what you are looking for.',
    },
    {
      id: '10',
      question: 'How do I leave a review after my safari?',
      answer:
        'After completing your safari, you can share your experience on our platform to help other travelers. Your feedback will contribute to the overall ratings and recommendations for that safari.',
    },
    {
      id: '11',
      question: 'Is KultureXplora free to use?',
      answer:
        'Yes, KultureXplora is free to use. You can browse, compare, and read reviews for safaris without any charge. When you are ready to book, we simply redirect you to the operator’s website to complete your booking.',
    },
    {
      id: '12',
      question: 'Can I trust the safari recommendations on KultureXplora?',
      answer:
        'Yes! Our recommendations are based on real traveler feedback, ratings, and the popularity of each safari. This helps ensure that the safaris we highlight are trusted by others and have a solid track record of providing great experiences.',
    },
  ];

  const toggleAccordion = (index: number): void => {
    if (openIndices.includes(index)) {
      // If the index is already in the array, remove it (close the accordion)
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      // If the index is not in the array, add it (open the accordion)
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <>
      <section className='faqs container my-5' id='faqs'>
        <h2 className='text-center mb-4'>FAQs</h2>
        <div className='accordion' id='faqAccordion'>
          {Faqs.map((faq, index) => (
            <div className='accordion-item' key={faq.id}>
              <h2 className='accordion-header' id={`heading${index}`}>
                <button
                  className={`accordion-button ${openIndices.includes(index) ? '' : 'collapsed'}`}
                  type='button'
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={openIndices.includes(index)}
                  aria-controls={`collapse${index}`}
                  style={{ outline: 'none', boxShadow: 'none' }}
                >
                  <strong>{faq.id}. </strong> {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${openIndices.includes(index) ? 'show' : ''}`}
                aria-labelledby={`heading${index}`}
              >
                <div className='accordion-body'>{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FAQs;
