'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
}

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, onError, onLoad, ...props }, ref) => {
    const [imageLoadError, setImageLoadError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    React.useEffect(() => {
      setImageLoadError(false);
      setImageLoaded(false);
    }, [src]);

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setImageLoadError(true);
      onError?.(event);
    };

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setImageLoaded(true);
      onLoad?.(event);
    };

    if (imageLoadError || !src) {
      return null;
    }

    return (
      <img
        ref={ref}
        className={cn('aspect-square h-full w-full object-cover', className)}
        src={src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          display: imageLoaded ? 'block' : 'none'
        }}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };