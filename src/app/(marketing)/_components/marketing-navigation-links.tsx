import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MarketingNavigationLink() {
  return (
    <Link href="/dashboard" className={cn(buttonVariants({ variant: 'outline' }))}>
      Dashboard <ArrowRight className="size-4" />
    </Link>
  );
}
