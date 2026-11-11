import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Button } from './button';

export interface CTASectionProps {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: CTASectionProps) {
  return (
    <section className={cn('py-12 sm:py-16 md:py-24', className)}>
      <Container size="lg">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-gradient-to-b from-secondary/80 to-secondary p-8 sm:p-12 md:p-16 text-center">
          <div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
            <h2 className="text-fluid-h2 font-semibold tracking-tight text-foreground [text-wrap:balance]">
              {title}
            </h2>
            <p className="text-fluid-lead text-muted-foreground mx-auto max-w-xl [text-wrap:balance]">
              {description}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                href={primaryAction.href}
                fullWidthMobile
                className="w-full sm:w-auto"
              >
                {primaryAction.label}
              </Button>
              {secondaryAction && (
                <Button
                  variant="secondary"
                  size="lg"
                  href={secondaryAction.href}
                  fullWidthMobile
                  className="w-full sm:w-auto"
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
