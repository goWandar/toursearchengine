import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

const badgeVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
  outline:
    'text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  warning: 'bg-warning text-warning-foreground hover:bg-warning/80',
  success: 'bg-success text-success-foreground hover:bg-success/80',
  info: 'bg-info text-info-foreground hover:bg-info/80',
};

// Base badge styles with proper padding
const badgeBaseStyles =
  'inline-flex items-center rounded-full border-0 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <div className={cn(badgeBaseStyles, badgeVariants[variant], className)} {...props} />;
}

export { Badge, badgeVariants };


