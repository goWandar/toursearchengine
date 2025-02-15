import React from 'react';

const Reason = () => {
  return (
    <section className=' py-5 bg-light'>
      <div className='container'>
        <h2 className='text-center display-5 fw-bold'>
          Why Choose KultureXplora?
        </h2>
        <div className='text-center mb-5'>
          <div className='section-divider'></div>
        </div>

        <div className='row g-4'>
          {/* <!-- Feature 1 --> */}
          <div className='col-md-6'>
            <div className='card h-100 feature-card border-0 shadow-sm'>
              <div className='card-body text-center p-4'>
                <div className='feature-icon mx-auto'>
                  <i className='bi bi-globe'></i>
                </div>
                <h3 className='fs-5 mb-3'>All Your Options in One Place</h3>
                <p className='card-text'>
                  We gather safari details from multiple tour operators, so you
                  can easily compare prices, itineraries, and reviews without
                  searching multiple websites.
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Feature 2 --> */}
          <div className='col-md-6'>
            <div className='card h-100 feature-card border-0 shadow-sm'>
              <div className='card-body text-center p-4'>
                <div className='feature-icon mx-auto'>
                  <i className='bi bi-star'></i>
                </div>
                <h3 className='fs-5 mb-3'>Reliable Recommendations</h3>
                <p className='card-text'>
                  Tours are sorted based on real traveler feedback, ratings, and
                  popularity, helping you find the best options quickly.
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Feature 3 --> */}
          <div className='col-md-6'>
            <div className='card h-100 feature-card border-0 shadow-sm'>
              <div className='card-body text-center p-4'>
                <div className='feature-icon mx-auto'>
                  <i className='bi bi-chat-square-text'></i>
                </div>
                <h3 className='fs-5 mb-3'>
                  Honest Reviews from Real Travelers
                </h3>
                <p className='card-text'>
                  Read reviews from people who have actually been on the tours,
                  and share your own experience to help others.
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Feature 4 --> */}
          <div className='col-md-6'>
            <div className='card h-100 feature-card border-0 shadow-sm'>
              <div className='card-body text-center p-4'>
                <div className='feature-icon mx-auto'>
                  <i className='bi bi-search'></i>
                </div>
                <h3 className='fs-5 mb-3'>Less Searching, More Exploring</h3>
                <p className='card-text'>
                  We do the research for you, so you can focus on choosing the
                  safari that's right for you without the hassle.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* primary featurea */}
        <div class='row mt-5'>
          <div class='col-12'>
            <div class='card border-0 shadow-sm'>
              <div class='card-body p-4 p-md-5'>
                <h3 class='h3 mb-4 text-center'>Primary Features</h3>
                <div class='row'>
                  <div class='col-lg-6 mx-auto'>
                    <ul class='list-unstyled feature-list'>
                      <li class='d-flex align-items-start mb-4'>
                        <div class='feature-bullet bg-warning-subtle rounded-circle p-2 me-3'>
                          <i class='bi bi-collection text-orange'></i>
                        </div>
                        <div>
                          <h4 class='h5 mb-2'>Collects Safari Information</h4>
                          <p class='mb-0'>
                            Gathers real-time details from safari operators,
                            including location, pricing, itineraries, duration,
                            and experience type.
                          </p>
                        </div>
                      </li>

                      <li class='d-flex align-items-start mb-4'>
                        <div class='feature-bullet bg-warning-subtle rounded-circle p-2 me-3'>
                          <i class='bi bi-star-fill text-orange'></i>
                        </div>
                        <div>
                          <h4 class='h5 mb-2'>Aggregates Reviews</h4>
                          <p class='mb-0'>
                            Collects reviews from platforms like TripAdvisor and
                            Google to provide a summary of ratings and feedback.
                          </p>
                        </div>
                      </li>

                      <li class='d-flex align-items-start mb-4'>
                        <div class='feature-bullet bg-warning-subtle rounded-circle p-2 me-3'>
                          <i class='bi bi-person-check text-orange'></i>
                        </div>
                        <div>
                          <h4 class='h5 mb-2'>Personalized Recommendations</h4>
                          <p class='mb-0'>
                            Suggests safaris based on your preferences, like
                            location, pricing, itineraries, duration, and
                            experience type.
                          </p>
                        </div>
                      </li>

                      <li class='d-flex align-items-start'>
                        <div class='feature-bullet bg-warning-subtle rounded-circle p-2 me-3'>
                          <i class='bi bi-link-45deg text-orange'></i>
                        </div>
                        <div>
                          <h4 class='h5 mb-2'>Direct Booking Links</h4>
                          <p class='mb-0'>
                            Offers direct links to safari operators for booking,
                            without handling the transactions on the platform.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reason;
