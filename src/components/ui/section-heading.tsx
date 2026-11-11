import React from 'react';
import { cn } from '@/lib/utils';
import { Badge, BadgeVariant, BadgeDotColor } from './badge';

export interface SectionHeadingProps {
  badge?: string | undefined;
  badgeVariant?: BadgeVariant | undefined;
  badgeDot?: BadgeDotColor | undefined;
  title: string;
  description?: string | undefined;
  align?: 'left' | 'center' | undefined;
  className?: string | undefined;
}

export function SectionHeading({
  badge,
  badgeVariant = 'accent',
  badgeDot,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  // If dot is not specified, default to a matching jewel dot
  const resolvedDot: BadgeDotColor = badgeDot !== undefined ? badgeDot : (
    badgeVariant === 'success' ? 'green' :
    badgeVariant === 'accent' ? 'blue' :
    badgeVariant === 'violet' ? 'violet' :
    badgeVariant === 'warning' ? 'amber' :
    'blue'
  );

  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {badge && (
        <div className="mb-3 sm:mb-3.5 inline-flex">
          <Badge variant={badgeVariant} dot={resolvedDot} size="md">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-fluid-h2 font-bold tracking-tight text-foreground [text-wrap:balance] mb-2 sm:mb-2.5">
        {title}
      </h2>
      {description && (
        <p className="text-fluid-lead text-muted-foreground max-w-2xl [text-wrap:balance]">
          {description}
        </p>
      )}
    </div>
  );
}
