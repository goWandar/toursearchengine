import React from 'react';

const Banner: React.FC = () => {
  return (
    <>
      <section className='banner'>
        <div className='container'>
          <h2 className='animate__animated animate__fadeInRight'>
            <span className='d-inline-block'>Safari Made Simple -</span>
            <br className='d-none d-sm-block d-md-none' />
            <span className='d-inline-block'>Find, Compare, Explore</span>
          </h2>{' '}
          <h3 className='animate__animated animate__fadeInLeftBig'>
            Africa&apos;s Best Safari Operators Curated For You!
          </h3>
        </div>
      </section>
    </>
  );
};

export default Banner;
