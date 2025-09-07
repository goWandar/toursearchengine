'use client';

import { cn } from '@/lib/utils';
import {
  forwardRef,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
}

export interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    >
      {children}
    </div>
  );
});
Avatar.displayName = 'Avatar';

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, onError, onLoad }) => {
    const [imageLoadError, setImageLoadError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
      setImageLoadError(false);
      setImageLoaded(false);
    }, [src]);

    const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
      setImageLoadError(true);
      onError?.(event);
    };

    const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
      setImageLoaded(true);
      onLoad?.(event);
    };

    if (imageLoadError || !src) {
      return null;
    }

    return (
      <Image
        className={cn('aspect-square h-full w-full object-cover', className)}
        src={src}
        alt={alt || ''}
        fill
        onError={handleError}
        onLoad={handleLoad}
        style={{
          display: imageLoaded ? 'block' : 'none',
        }}
      />
    );
  },
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
