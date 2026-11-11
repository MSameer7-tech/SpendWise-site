import React from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />

      <main className="flex-1 flex items-center justify-center py-20">
        <Container size="sm" className="text-center space-y-6">
          <Badge variant="outline">404 Error • Page Not Found</Badge>

          <h1 className="text-fluid-h1 font-bold tracking-tight text-foreground">
            Clear finances. Uncharted page.
          </h1>

          <p className="text-fluid-lead text-muted-foreground max-w-md mx-auto">
            The link you followed doesn&apos;t exist or may have been moved. Everything else in SpendWise remains accounted for.
          </p>

          <div className="pt-4 flex flex-col xs:flex-row items-center justify-center gap-3">
            <Button variant="primary" size="lg" href="/" fullWidthMobile>
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
            <Button variant="secondary" size="lg" href="/faq" fullWidthMobile>
              Visit Knowledge Base
            </Button>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
