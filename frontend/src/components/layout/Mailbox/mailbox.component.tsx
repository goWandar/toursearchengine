import { useState } from 'react';
import Mailbox from '../../../assets/icons/mailbox.png';
import { subscribeToWaitlist } from '@/api/api';

const JoinWaitlistBox = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'invalid'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');
    try {
      await subscribeToWaitlist(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className='absolute left-1/2 bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-40 -translate-x-1/2 z-50 w-full px-4'>
      <div className='max-w-6xl mx-auto bg-[#E5D6B5] rounded-xl shadow-lg px-6 py-8 flex flex-col lg:flex-row justify-between items-center gap-6'>
        {/* Left Text */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#305653] mb-3">Join Our Community</h2>
          <p className="text-[#305653] mb-5 text-sm md:text-base max-w-md">
            Be among the first to experience Wandar and help shape the future of safari planning.
          </p>
          <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <input
              id="email-input"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-md w-full sm:w-[280px] bg-white text-[#2E2E2E] outline-none"
              required
            />
            <button
              type='submit'
              disabled={status === 'loading'}
              className='bg-[#305653] text-white font-semibold px-6 py-3 rounded-md hover:opacity-90'
            >
              {status === 'loading' ? 'Submitting...' : 'Join Waitlist'}
            </button>
          </form>
          {status === 'invalid' && (
            <p className="text-red-700 mt-2 text-sm">Please enter a valid email address.</p>
          )}
          {status === 'success' && (
            <p className="text-green-700 mt-2 text-sm">Thanks for joining the waitlist!</p>
          )}
          {status === 'error' && (
            <p className="text-red-700 mt-2 text-sm">Something went wrong. Please try again.</p>
          )}
        </div>

        {/* Mailbox Image */}
        <div className='flex-shrink-0'>
          <img src={Mailbox} alt='Mailbox' className='w-[160px] md:w-[200px]' />
        </div>
      </div>
    </div>
  );
};

export default JoinWaitlistBox;
