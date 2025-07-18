import { useState } from 'react';
import Mailbox from '../../../assets/icons/mailbox.png';
import { subscribeToWaitlist } from '@/api/api';

const JoinWaitlistBox = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'invalid' | 'duplicate'>('idle');

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
    } catch (error: any) {
      if (error.response?.status === 409) setStatus('duplicate');
      else setStatus('error');
    }
  };

  return (
    <div className='relative'>
<div className="absolute left-1/2 bottom-[-8rem] transform -translate-x-1/2 w-full px-4 z-50">
  <div className="relative z-40 w-full max-w-5xl mx-auto bg-[#E5D6B5] rounded-xl shadow-lg px-4 sm:px-6 py-5 sm:py-6 flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
    
    {/* Left Text + Form */}
    <div className="flex-1 text-center lg:text-left">
      <h2 className="text-xl sm:text-2xl font-bold text-[#305653] mb-2">Join Our Community</h2>
      <p className="text-[#305653] mb-4 text-sm max-w-md mx-auto lg:mx-0">
        Be among the first to experience Wandar and help shape the future of safari planning.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
        <input
          id="email-input"
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded-md w-full sm:w-[240px] text-sm bg-white text-[#2E2E2E] outline-none"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-[#305653] text-white text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90"
        >
          {status === 'loading' ? 'Submitting...' : 'Subscribe'}
        </button>
      </form>

      {/* Status Messages */}
      {status === 'invalid' && (
        <p className="text-red-700 mt-1 text-xs">Please enter a valid email address.</p>
      )}
      {status === 'duplicate' && (
        <p className="text-red-500 mt-1 text-xs">This email is already on the waitlist.</p>
      )}
      {status === 'success' && (
        <p className="text-green-700 mt-1 text-xs">Thanks for joining the waitlist!</p>
      )}
      {status === 'error' && (
        <p className="text-red-700 mt-1 text-xs">Something went wrong. Please try again.</p>
      )}
    </div>

    {/* Mailbox Image - hidden on small screens */}
    <div className="hidden md:block flex-shrink-0">
      <img src={Mailbox} alt="Mailbox" className="w-[120px] md:w-[160px]" />
    </div>
  </div>
</div>

      </div>
  );
};

export default JoinWaitlistBox;
