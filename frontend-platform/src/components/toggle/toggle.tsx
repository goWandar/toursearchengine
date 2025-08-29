'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, forwardRef, ComponentRef } from 'react';

interface ToggleVariants {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

function getToggleVariants({ variant = 'default', size = 'default' }: ToggleVariants = {}) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground';

  const variantClasses = {
    default: 'bg-transparent',
    outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
  };

  const sizeClasses = {
    default: 'h-10 px-3',
    sm: 'h-9 px-2.5',
    lg: 'h-11 px-5',
  };

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
}

interface ToggleProps
  extends ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    ToggleVariants {}

const Toggle = forwardRef<ComponentRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(getToggleVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
