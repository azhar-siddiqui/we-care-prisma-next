import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Rocket, User } from 'lucide-react';
import Image from 'next/image';

export default function MarketingHero() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/marketing-hero.jpg"
        className="absolute inset-0 z-0 object-cover opacity-90 min-h-[700px]"
        width={1500}
        height={600}
        alt="Laboratory management hero banner"
        priority={true} // Optimize for LCP
        sizes="(max-width: 768px) 100vw, 1400px" // Responsive image sizing
      />

      <div className="relative z-10 container mx-auto">
        <div className="grid min-h-[600px] grid-cols-1 items-center gap-8 px-4 py-16 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 px-4 py-1"
            >
              Innovative Lab Management
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Streamline Your <span className="text-primary">Laboratory</span> Operations
            </h1>
            <p className="max-w-md text-lg">
              All-in-one solution for patient report generation, inventory management, and seamless
              SAAS integration.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button size="lg" className="!rounded-button cursor-pointer whitespace-nowrap">
                <Rocket className="mr-2" /> Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="!rounded-button cursor-pointer">
                <Calendar className="mr-2" /> Book a Demo
              </Button>
            </div>
            <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="border-primary bg-primary/20 text-primary flex h-8 w-8 items-center justify-center rounded-full border text-xs"
                  >
                    <User className="size-4 text-white" />
                  </div>
                ))}
              </div>
              <p className="text-foreground text-sm">
                Trusted by <span className="text-foreground font-medium">2,000+</span> labs
                worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
