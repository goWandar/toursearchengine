import { CARD_ALIGNMENT, CARD_VARIANT, CardProps } from './card.types';
import Button from '../button/button.component';
import { BUTTON_ICON_POSITION, BUTTON_VARIANT } from '../button/button.types';
import { FaArrowRight } from 'react-icons/fa';

const Card = ({
  icon,
  title,
  description,
  alignment = CARD_ALIGNMENT.CENTER,
  variant = CARD_VARIANT.PRIMARY,
  className = '',
  showDivider = false,
  showLearnMore = false,
  onLearnMoreClick,
  textColor,
  learnMoreButton,
}: CardProps) => {
  const alignmentStyles = {
    [CARD_ALIGNMENT.LEFT]: 'items-start text-left',
    [CARD_ALIGNMENT.CENTER]: 'items-center text-center',
    [CARD_ALIGNMENT.RIGHT]: 'items-end text-right',
  };

  const variantStyles = {
    [CARD_VARIANT.PRIMARY]: 'bg-white border-primary-brown',
    [CARD_VARIANT.SECONDARY]: 'bg-[white] bg-opacity-10 text-white',
  };

  const defaultTextColor = variant === CARD_VARIANT.PRIMARY ? 'text-neutral-900' : 'text-white';
  const finalTextColor = textColor || defaultTextColor;

  return (
    <div
      className={`
        inline-flex
        w-full
        min-w-[240px]
        h-[24rem]
        p-[1.7rem_2rem]
        flex-col
        flex-shrink-0
        border-[0.9px]
        justify-center
        items-center
        rounded-[0.5rem]
        shadow-sm
        hover:shadow-md
        transition-shadow
        ${variantStyles[variant]}
        ${alignmentStyles[alignment]}
        ${className}
      `}
    >
      {icon && <div className={`text-4xl mb-[1.4rem] ${finalTextColor}`}>{icon}</div>}

      <div className='flex flex-col items-center w-full'>
        <div className='mt-[0.9rem] w-full text-center'>
          <h3
            className={`text-[1.4rem] font-semibold leading-normal ${finalTextColor} break-words`}
          >
            {title}
          </h3>
          <p
            className={`text-[1rem] mt-[0.9rem] font-normal leading-normal ${finalTextColor} opacity-80 overflow-y-auto break-words`}
          >
            {description}
          </p>
        </div>
      </div>

      {showDivider && <div className='mt-[2rem] mb-[2rem] w-full h-[1px] bg-current opacity-20' />}

      {showLearnMore && !learnMoreButton && (
        <Button
          id='learn-more-button'
          label='Learn More'
          variant={BUTTON_VARIANT.TERTIARY}
          hasBorder={false}
          icon={<FaArrowRight />}
          textColor={finalTextColor}
          iconPosition={BUTTON_ICON_POSITION.RIGHT}
          onClick={onLearnMoreClick}
          className=' hover:opacity-80'
        />
      )}

      {learnMoreButton}
    </div>
  );
};

export default Card;
