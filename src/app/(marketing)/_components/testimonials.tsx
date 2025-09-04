import { Marquee } from '@/components/magicui/marquee';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { testimonialsData } from '@/data/marketing-data';
import { LucideProps, Star, StarHalf } from 'lucide-react';

interface TestimonialsCardInterface {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  rating: number;
}

export default function Testimonials() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1"
          >
            Testimonials
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Trusted by Lab Professionals</h2>
          <p className="text-muted-foreground">
            Hear what our customers have to say about how We Care has transformed their operations.
          </p>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:50s]">
          {testimonialsData.map((testimonial) => (
            <TestimonialsCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>
    </section>
  );
}

const TestimonialsCard = ({ testimonial }: { testimonial: TestimonialsCardInterface }) => {
  return (
    <Card key={testimonial.id} className="border-border/50 w-md shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 flex h-11.5 w-14 items-center justify-center rounded-full">
            <testimonial.avatar className="text-primary" />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <p className="font-medium">{testimonial.name}</p>
              <div className="flex items-center gap-2 text-amber-400">
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
            <p className="text-muted-foreground text-sm">{testimonial.role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-sm italic">&ldquo;{testimonial.quote}&rdquo;</p>
      </CardContent>
    </Card>
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Check for half star
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0); // Number of empty stars

  return (
    <div className="flex items-center gap-2 text-amber-400">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <Star key={`full-${index}-${_}`} className="size-4 fill-amber-400" />
      ))}
      {/* Half star */}
      {hasHalfStar && <StarHalf key="half" className="size-4 fill-amber-400" />}
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <Star key={`empty-${index}-${_}`} className="size-4 fill-none" />
      ))}
    </div>
  );
};
