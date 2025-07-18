const HeroContent = () => {
  return (
    <div className="flex flex-col items-center md:items-start gap-10 px-4 sm:px-8 text-center md:text-left w-full max-w-4xl">
      <div className="flex flex-col gap-4">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Find your perfect safari experience
        </h1>
        <p className="text-white text-base sm:text-lg md:text-xl font-medium">
          Discover curated African adventures tailored to your travel style and preferences
        </p>
      </div>

      {/* Buttons — Uncomment if needed later */}
      {/* <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Button
          id="discover-more-button"
          label="Discover more"
          variant={BUTTON_VARIANT.PRIMARY}
          icon={<BsArrowRight />}
          iconPosition={BUTTON_ICON_POSITION.RIGHT}
          className="text-black hover:bg-primary-600 transition-colors duration-200"
        />
        <Button
          id="watch-video-button"
          label="Watch Video"
          variant={BUTTON_VARIANT.TERTIARY}
          hasBorder={true}
          className="text-white hover:text-black"
        />
      </div> */}
    </div>
  );
};

export default HeroContent;
