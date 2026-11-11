import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from '../ui/container';
import { SectionHeading } from '../ui/section-heading';

export interface FeatureSectionProps {
  badge?: string | undefined;
  badgeVariant?: 'default' | 'accent' | 'success' | 'outline' | undefined;
  title: string;
  description?: string | undefined;
  layout?: 'split' | 'split-reverse' | 'grid' | undefined;
  media?: React.ReactNode | undefined;
  children?: React.ReactNode | undefined;
  className?: string | undefined;
}

export function FeatureSection({
  badge,
  badgeVariant = 'accent',
  title,
  description,
  layout = 'split',
  media,
  children,
  className,
}: FeatureSectionProps) {
  if (layout === 'grid') {
    return (
      <section className={cn('py-12 sm:py-16 md:py-24', className)}>
        <Container size="lg">
          <SectionHeading
            badge={badge}
            badgeVariant={badgeVariant}
            title={title}
            description={description}
            align="center"
            className="mb-10 sm:mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {children}
          </div>
        </Container>
      </section>
    );
  }

  const isReverse = layout === 'split-reverse';

  return (
    <section className={cn('py-12 sm:py-16 md:py-24', className)}>
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Text Content Column */}
          <div
            className={cn(
              'flex flex-col gap-4 sm:gap-6',
              isReverse && 'lg:order-2'
            )}
          >
            <SectionHeading
              badge={badge}
              badgeVariant={badgeVariant}
              title={title}
              description={description}
              align="left"
            />
            {children && <div className="space-y-4 pt-2">{children}</div>}
          </div>

          {/* Media / Mockup Column */}
          <div
            className={cn(
              'flex justify-center w-full',
              isReverse && 'lg:order-1'
            )}
          >
            {media}
          </div>
        </div>
      </Container>
    </section>
  );
}
