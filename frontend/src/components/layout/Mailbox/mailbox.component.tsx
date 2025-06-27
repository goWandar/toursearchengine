import Mailbox from '../../../assets/icons/mailbox.png';

const JoinWaitlistBox = () => {
  return (
    <div className='absolute left-1/2 bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-40 -translate-x-1/2 z-50 w-full px-4'>
      <div className='max-w-6xl mx-auto bg-[#E5D6B5] rounded-xl shadow-lg px-6 py-8 flex flex-col lg:flex-row justify-between items-center gap-6'>
        {/* Left Text */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#305653] mb-3">Join Our Community</h2>
          <p className="text-[#305653] mb-5 text-sm md:text-base max-w-md">

            Be among the first to experience Wandar and help shape the future of safari planning.
          </p>
          <form className='flex flex-col sm:flex-row gap-4'>
            <input

             id="email-input"
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md w-full sm:w-[280px] bg-white text-[#2E2E2E] outline-none"

            />
            <button
              type='submit'
              className='bg-[#305653] text-white font-semibold px-6 py-3 rounded-md hover:opacity-90'
            >
              Join Waitlist
            </button>
          </form>
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
