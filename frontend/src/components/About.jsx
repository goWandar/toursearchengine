import React from 'react';

const About = () => {
  return (
    <>
      <section class='py-5 bg-white'>
        <div class='container'>
          <div class='text-center mb-5'>
            <h2 class='display-5 fw-bold'>About Us</h2>
            <div class='section-divider'></div>
            <div class='row justify-content-center'>
              <div class='col-lg-8'>
                <div class='about-card p-4 p-md-5'>
                  <p class='fs-5 mb-4'>
                    KultureXplora makes finding the right safari simple. We
                    simplify safari planning by gathering tour details from
                    multiple operator websites and trusted review platforms, so
                    you don't have to. We bring everything into one place:
                    prices, itineraries, and real traveler feedback making it
                    easy to compare options without the hassle of endless
                    research.
                  </p>
                  <p class='fs-5'>
                    Once you find the perfect safari, we connect you directly to
                    the operator's website to book. No extra steps, no
                    middlemen, just a seamless way to explore Africa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
