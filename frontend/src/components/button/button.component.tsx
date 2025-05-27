import {
  BUTTON_ICON_POSITION,
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
  ButtonProps,
} from './button.types';

const Button = ({
  label,
  size = BUTTON_SIZE.NORMAL,
  variant = BUTTON_VARIANT.PRIMARY,
  shape = BUTTON_SHAPE.RECTANGLE,
  icon,
  iconPosition = BUTTON_ICON_POSITION.LEFT,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  textColor,
  iconColor,
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeStyles = {
    [BUTTON_SIZE.SMALL]: label ? 'px-3 py-1.5 text-sm' : 'p-1.5 text-sm',
    [BUTTON_SIZE.NORMAL]: label ? 'px-4 py-2 text-base' : 'p-2 text-base',
    [BUTTON_SIZE.LARGE]: label ? 'px-6 py-3 text-lg' : 'p-3 text-lg',
  };

  const variantStyles = {
    [BUTTON_VARIANT.PRIMARY]: 'bg-primary-500 hover:bg-primary-600 focus:ring-primary-400',
    [BUTTON_VARIANT.SECONDARY]: 'bg-secondary-500 hover:bg-secondary-600 focus:ring-secondary-400',
    [BUTTON_VARIANT.TERTIARY]:
      'bg-transparent hover:bg-neutral-100 focus:ring-neutral-400 border border-neutral-300',
  };

  const shapeStyles = {
    [BUTTON_SHAPE.RECTANGLE]: 'rounded-md',
    [BUTTON_SHAPE.CIRCLE]: 'rounded-full',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const iconSpacing = {
    [BUTTON_ICON_POSITION.LEFT]: 'mr-2',
    [BUTTON_ICON_POSITION.RIGHT]: 'ml-2',
    [BUTTON_ICON_POSITION.TOP]: 'mb-2',
    [BUTTON_ICON_POSITION.BOTTOM]: 'mt-2',
    [BUTTON_ICON_POSITION.CENTER]: '',
  };

  const buttonStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${shapeStyles[shape]}
    ${disabled ? disabledStyles : ''}
    ${className}
  `;

  const textStyles =
    textColor || (variant === BUTTON_VARIANT.TERTIARY ? 'text-neutral-700' : 'text-white');
  const iconStyles = iconColor || textStyles;

  const renderContent = () => {
    // If no label is provided, treat it as an icon-only button
    if (!label) {
      return <span className={iconStyles}>{icon}</span>;
    }

    // If shape is circle and no label, show only icon
    if (shape === BUTTON_SHAPE.CIRCLE && !label) {
      return <span className={iconStyles}>{icon}</span>;
    }

    // If icon position is center, show only icon
    if (iconPosition === BUTTON_ICON_POSITION.CENTER) {
      return <span className={iconStyles}>{icon}</span>;
    }

    const iconElement = icon && (
      <span className={`${iconSpacing[iconPosition]} ${iconStyles}`}>{icon}</span>
    );

    if (iconPosition === BUTTON_ICON_POSITION.TOP || iconPosition === BUTTON_ICON_POSITION.BOTTOM) {
      return (
        <div className='flex flex-col items-center'>
          {iconPosition === BUTTON_ICON_POSITION.TOP && iconElement}
          <span className={textStyles}>{label}</span>
          {iconPosition === BUTTON_ICON_POSITION.BOTTOM && iconElement}
        </div>
      );
    }

    return (
      <>
        {iconPosition === BUTTON_ICON_POSITION.LEFT && iconElement}
        <span className={textStyles}>{label}</span>
        {iconPosition === BUTTON_ICON_POSITION.RIGHT && iconElement}
      </>
    );
  };

  return (
    <button type={type} className={buttonStyles} onClick={onClick} disabled={disabled}>
      {renderContent()}
    </button>
  );
};

export default Button;
