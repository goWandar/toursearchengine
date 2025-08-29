'use client';

import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes } from 'react';

// Define variant styles
const alertVariants = {
  default: 'bg-background text-foreground border-border',
  destructive: 'border-destructive/50 text-destructive bg-destructive/5 [&>svg]:text-destructive',
  warning: 'border-warning/50 text-warning bg-warning/5 [&>svg]:text-warning',
  success: 'border-success/50 text-success bg-success/5 [&>svg]:text-success',
  info: 'border-info/50 text-info bg-info/5 [&>svg]:text-info',
} as const;

type AlertVariant = keyof typeof alertVariants;

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
        alertVariants[variant],
        className,
      )}
      {...props}
    />
  ),
);
Alert.displayName = 'Alert';

const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
  ),
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
export type { AlertProps, AlertVariant };
