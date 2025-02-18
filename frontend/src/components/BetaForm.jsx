import React, { useState } from 'react';
import axios from 'axios';

const { VITE_BASE_URL: baseURL, VITE_API_PATH: apiPath } = import.meta.env;


const BetaForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // 替換 API 端點
      const response = await axios.post('http://localhost:3001/subscribe', {
        email,
      });

      setMessage({
        text: 'Thank you for joining our waitlist!',
        type: 'success',
      });
      setEmail('');
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          'An error occurred. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='form-container'>
      <h1 className='title'>Early Beta Access</h1>
      <p className='description'>
        Join our exclusive beta launch and get first access to Africa's
        best-ranked safari operators
      </p>

      <form onSubmit={handleSubmit} className='email-form'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          required
          className='email-input'
        />
        <button
          type='submit'
          disabled={isLoading}
          className={`submit-button ${
            isLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {isLoading ? 'Submitting...' : 'Join Waitlist'}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default BetaForm;
