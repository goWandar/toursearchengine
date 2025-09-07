'use client';

import { cn } from '@/lib/utils';
import {
  ButtonHTMLAttributes,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  useEffect,
} from 'react';

// Button variants using object-based approach instead of class-variance-authority
const buttonVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
};

// Button sizes using object-based approach
const buttonSizes = {
  sm: 'h-9 rounded-md px-3',
  default: 'h-10 px-4 py-2',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};

// Base button styles with enhanced accessibility and icon support
const buttonBaseStyles =
  'inline-flex items-center justify-center gap-0.5 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    // Enforce aria-label for icon-only buttons
    useEffect(() => {
      if (size === 'icon' && !props['aria-label'] && !props['aria-labelledby']) {
        console.warn(
          'Button with size="icon" should have an aria-label or aria-labelledby for accessibility. ' +
            'Icon-only buttons need descriptive labels for screen readers.',
        );
      }
    }, [size, props]);

    // Handle loading state
    const isDisabled = disabled || loading;

    // Loading spinner component
    const LoadingSpinner = () => (
      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    );

    // Prepare children with loading state
    const buttonChildren = loading ? (
      <>
        <LoadingSpinner />
        {children}
      </>
    ) : (
      children
    );

    // Simplified asChild implementation
    if (asChild && isValidElement(children) && !loading) {
      const childElement = children as ReactElement<{ className?: string }>;

      return cloneElement(childElement, {
        ...childElement.props,
        className: cn(
          buttonBaseStyles,
          buttonVariants[variant],
          buttonSizes[size],
          className,
          childElement.props.className,
        ),
        disabled: isDisabled,
        'aria-disabled': isDisabled,
        ...Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'ref')),
      } as React.HTMLAttributes<HTMLElement> & { disabled?: boolean; 'aria-disabled'?: boolean });
    }

    return (
      <button
        className={cn(buttonBaseStyles, buttonVariants[variant], buttonSizes[size], className)}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {buttonChildren}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants, buttonSizes };
