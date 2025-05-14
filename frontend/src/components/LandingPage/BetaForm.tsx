import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
}

interface Message {
  text: string;
  type: 'success' | 'error';
}

interface ApiError {
  statusCode: number;
  error?: string;
  message?: string;
}

const { VITE_API_PATH } = import.meta.env;

const BetaForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);

  const onSubmit = async (data: FormData): Promise<void> => {
    setIsLoading(true);
    setMessage(null);

    try {
      await axios.post(`${VITE_API_PATH}/api/subscribers`, {
        email: data.email,
      });

      // 處理伺服器回應
      setMessage({
        text: 'Thank you for joining our waitlist!',
        type: 'success',
      });
      reset();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      // console.log('Error details:', {
      //   status: error.response?.status,
      //   data: error.response?.data,
      //   error: error.response?.data?.error,
      // });
      // console.log(error);
      if (
        axiosError.response?.data?.statusCode === 409 ||
        axiosError.response?.data?.statusCode === 204
      ) {
        setMessage({
          text: 'This email is already registered. Please use a different email.',
          type: 'error',
        });
        return;
      }
      let messageText = 'An error occurred. Please try again.';

      if (axiosError.response?.data) {
        const { statusCode, error: apiError } = axiosError.response.data;
        switch (statusCode) {
          case 400:
            messageText = apiError || 'Invalid request';
            break;

          case 204:
            messageText = 'This email is already registered. Please use a different email.';
            break;
          default:
            messageText = apiError || 'Server error occurred';
        }
      } else if (axiosError.request) {
        messageText = 'Unable to connect to the server. Please check your internet connection.';
      } else {
        messageText = 'Something went wrong. Please try again later.';
      }
      setMessage({
        text: messageText,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  return (
    <>
      <section className='betaForm'>
        <div className='form-container'>
          <h1 className='title fw-bold animate__animated animate__heartBeat'>Early Beta Access</h1>
          <p className='description'>
            Join our exclusive beta launch and get first access to Africa&apos;s best-ranked safari
            operators
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className='email-form'>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type='email'
              placeholder='Enter your email'
              className='email-input'
            />
            {errors.email && (
              <div className='error-message invalid-feedback d-block'>{errors.email.message}</div>
            )}
            <button
              type='submit'
              disabled={isLoading}
              className={`submit-button ${isLoading ? 'disabled opacity-50' : ''}`}
            >
              {isLoading ? 'Submitting...' : 'Join Waitlist'}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded ${
                message.type === 'success'
                  ? 'alert alert-success text-success border border-success-subtle'
                  : 'alert alert-danger  border border-danger-subtle'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
        {/* primary featurea */}
        <div className='row mt-5'>
          <div className='col-12'>
            <div className='card border-0 shadow-sm'>
              <div className='card-body p-4 p-md-5'>
                <h3 className='h3 mb-4 text-center'>Primary Features</h3>
                <div className='row'>
                  <div className='col-lg-6 mx-auto'>
                    <ul className='list-unstyled feature-list'>
                      <li className='d-flex align-items-start mb-4'>
                        <div className='feature-bullet bg-warning-subtle rounded-circle p-2 me-3'>
                          <i
                            className='bi bi-collection'
                            style={{
                              color: 'var(--primary-color)',
                            }}
                          />
                        </div>
                        <div>
                          <h4 className='h5 mb-2'>Collects Safari Information</h4>
                          <p className='mb-0'>
                            Gathers real-time details from safari operators, including location,
                            pricing, itineraries, duration, and experience type.
                          </p>
                        </div>
                      </li>

                      <li className='d-flex align-items-start mb-4'>
                        <div className='feature-bullet bg-warning-subtle rounded-circle p-2 me-3'>
                          <i className='bi bi-star-fill ' />
                        </div>
                        <div>
                          <h4 className='h5 mb-2'>Aggregates Reviews</h4>
                          <p className='mb-0'>
                            Collects reviews from platforms like TripAdvisor and Google to provide a
                            summary of ratings and feedback.
                          </p>
                        </div>
                      </li>

                      <li className='d-flex align-items-start mb-4'>
                        <div className='feature-bullet bg-warning-subtle rounded-circle p-2 me-3'>
                          <i className='bi bi-person-check ' />
                        </div>
                        <div>
                          <h4 className='h5 mb-2'>Personalized Recommendations</h4>
                          <p className='mb-0'>
                            Suggests safaris based on your preferences, like location, pricing,
                            itineraries, duration, and experience type.
                          </p>
                        </div>
                      </li>

                      <li className='d-flex align-items-start'>
                        <div className='feature-bullet bg-warning-subtle rounded-circle p-2 me-3'>
                          <i className='bi bi-link-45deg ' />
                        </div>
                        <div>
                          <h4 className='h5 mb-2'>Direct Booking Links</h4>
                          <p className='mb-0'>
                            Offers direct links to safari operators for booking, without handling
                            the transactions on the platform.
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
      </section>
    </>
  );
};

export default BetaForm;
