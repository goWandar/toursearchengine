import React from 'react';
import { FaGlobeAmericas } from 'react-icons/fa'; // Font Awesome 圖標
import { AiFillStar } from 'react-icons/ai'; // Ant Design 圖標
import { BsCheckCircleFill } from 'react-icons/bs'; // Bootstrap 圖標
import { FaRegPenToSquare } from 'react-icons/fa6';

const ProcessCard = ({ number, title, description, icon: Icon }) => {
  return (
    <div className='process-card d-flex align-items-center p-4 bg-white position-relative mt-8'>
      {/* number bg */}
      <div
        className='process-number d-flex align-items position-absolute'
        style={{
          backgroundColor: '#B6DDD0',
        }}
      >
        {number}
      </div>

      <div className='d-flex flex-column align-items-center mt-3 '>
        <h3 className='fs-5 fs-sm-4  text-center mb-2 mb-sm-3'>{title}</h3>
        {/* 圖標背景 */}
        <div
          className='process-icon mb-3'
          style={{
            backgroundColor: 'rgba(15, 148, 118, 0.1)',
          }}
        >
          {/* 圖標顏色 */}
          <Icon className='icon' style={{ color: '#0F9476' }} />
        </div>
        <p className='text-muted text-center small px-2 px-sm-4'>
          {description}
        </p>
      </div>
    </div>
  );
};

const How = () => {
  const processSteps = [
    {
      id: 1,
      number: '1',
      title: 'Collecting Tour Information',
      description:
        'We scan safari operator websites to gather details like prices, itineraries, and customer reviews. This keeps our listings up to date with the latest information',
      icon: FaGlobeAmericas,
    },
    {
      id: 2,
      number: '2',
      title: 'Organizing the Data',
      description:
        'We store and standardize the collected information so you can easily compare safaris from different operators.',
      icon: AiFillStar,
    },
    {
      id: 3,
      number: '3',
      title: 'Showing the Best Options',
      description:
        'Based on reviews, ratings, and popularity, we highlight top safaris that match what you‘re looking for',
      icon: BsCheckCircleFill,
    },
    {
      id: 4,
      number: '4',
      title: 'Traveler Reviews',
      description:
        'After your trip, you can share your experience to help other travelers make better choices.',
      icon: FaRegPenToSquare,
    },
  ];
  return (
    <>
      <section className='how-section py-5'>
        <div className='container'>
          <h2 className='text-center display-5 fw-bold mb-4'>
            How KultureXplora Works
          </h2>
          <h3 className='text-center text-muted mb-5'>
            Too many safari operators to choose from? <br />
            Let us do the work. You see only the best.
          </h3>
          <div className='row g-4 mt-3 justify-content-center  flex-column'>
            {processSteps.map((step) => (
              <div key={step.id} className='col-12  mb-4'>
                <ProcessCard
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              </div>
            ))}
          </div>

          {/* 導航點也改為相同顏色 */}
          <div className='d-flex justify-content-center d-sm-none gap-2'>
            {processSteps.map((step) => (
              <div
                key={step.id}
                className='nav-dot'
                style={{ backgroundColor: '#0F9476' }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default How;
