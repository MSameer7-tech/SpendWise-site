import React from 'react';
import { cn } from '@/lib/utils';

export interface ResponsiveImageProps {
  src?: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '9/19.5' | 'auto';
  className?: string;
  caption?: string;
  children?: React.ReactNode;
}

export function ResponsiveImage({
  src,
  alt,
  aspectRatio = '16/9',
  className,
  caption,
  children,
}: ResponsiveImageProps) {
  const aspectClasses = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '9/19.5': 'aspect-[9/19.5]',
    auto: '',
  };

  return (
    <figure className={cn('relative w-full overflow-hidden rounded-xl border border-border bg-secondary/50', className)}>
      <div className={cn('relative w-full flex items-center justify-center', aspectClasses[aspectRatio])}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          children || (
            <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
              {alt}
            </div>
          )
        )}
      </div>
      {caption && (
        <figcaption className="p-3 text-center text-xs text-muted-foreground border-t border-border">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
