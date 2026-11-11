import React from 'react';
import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { Smartphone, ShieldCheck } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-12 sm:py-16 bg-secondary/30">
      <Container size="lg">
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-b from-card via-card to-secondary/50 p-6 sm:p-10 lg:p-14 text-center shadow-xl shadow-foreground/5">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1 text-xs font-medium text-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              <span>Available for Android &amp; Web</span>
            </div>

            <h2 className="text-fluid-h2 font-bold tracking-tight text-foreground [text-wrap:balance]">
              Make your money easier to manage.
            </h2>

            <p className="text-fluid-lead text-muted-foreground mx-auto max-w-xl [text-wrap:balance]">
              Join individuals, flatmates, and friends managing their money with clarity, fairness, and confidence.
            </p>

            <div className="pt-2 flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                href="/download"
                fullWidthMobile
                className="w-full xs:w-auto group bg-[#064e3b] hover:bg-[#064e3b]/90 text-white dark:bg-[#10B981] dark:text-[#071A14] dark:hover:bg-[#34D399] shadow-sm font-semibold"
              >
                <Smartphone className="mr-2 h-4 w-4" />
                Download App
              </Button>
            </div>

            <p className="text-xs text-muted-foreground pt-4">
              Web application runs immediately in your browser • No credit card required.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
