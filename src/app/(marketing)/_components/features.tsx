import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

import { featuresData } from '@/data/marketing-data';
import Image from 'next/image';

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="lg:container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20 mb-4 animate-bounce px-4 py-1"
          >
            Key Features
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Comprehensive Lab Management Solution
          </h2>
          <p className="text-muted-foreground">
            Our platform offers everything you need to run your laboratory efficiently, from patient
            reports to inventory management.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featuresData.map((feature, index) => (
            <Card
              key={`${feature.description}-${index}`}
              className="border-border/50 overflow-hidden shadow-sm transition-shadow hover:shadow-md pt-0"
            >
              <Image
                src={feature.image}
                className="h-50 w-full"
                width={1400}
                height={700}
                alt={feature.title}
                priority={index === 0} // Optimize for LCP
              />

              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                    <feature.icon className="text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="outline"
                  className="!rounded-button cursor-pointer whitespace-nowrap"
                >
                  Learn more <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
