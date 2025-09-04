import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { benefitsData } from '@/data/marketing-data';
import Image from 'next/image';
import benefitsImg from '../../../../public/images/benefits.jpg';

export default function Benefits() {
  return (
    <section id="benefits" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1"
            >
              Benefits
            </Badge>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Transform Your Laboratory Operations
            </h2>
            <p className="text-muted-foreground mb-8">
              Our platform helps you save time, reduce errors, and improve patient care through
              streamlined workflows and powerful automation.
            </p>

            <div className="space-y-4">
              {benefitsData.map((benefit) => (
                <div key={benefit.id} className="flex items-start gap-3">
                  <div className="bg-primary/20 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                    <benefit.icon className="text-primary h-4 w-4" />
                  </div>
                  <p className="font-medium">{benefit.title}</p>
                </div>
              ))}
            </div>

            <Button className="!rounded-button mt-8 cursor-pointer whitespace-nowrap">
              Explore All Benefits
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-xl shadow-xl">
            <Image
              src={benefitsImg}
              className="h-full w-full rounded-xl object-cover object-top"
              width={1500}
              height={600}
              alt="Laboratory management hero banner"
              priority={true}
              sizes="(max-width: 768px) 100vw, 1400px"
            />
            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="font-medium text-white">
                Interactive dashboard for complete lab overview
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
