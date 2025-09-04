import { Marquee } from '@/components/magicui/marquee';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { faqData } from '@/data/marketing-data';
import { HelpCircle } from 'lucide-react';

interface FaqCardInterface {
  id: number;
  question: string;
  answer: string;
}

export default function Faq() {
  const firstRow = faqData.slice(0, faqData.length / 2);
  const secondRow = faqData.slice(faqData.length / 2);

  return (
    <section className="bg-muted/30">
      <div className="container mx-auto px-4 pt-16">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20 mb-4 animate-bounce px-4 py-1"
          >
            FAQ
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Find answers to common questions about our lab management solution.
          </p>
        </div>
      </div>
      <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
        <Marquee pauseOnHover vertical className="[--duration:50s]">
          {firstRow.map((faq) => (
            <FaqCard key={faq.id} faq={faq} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:50s]">
          {secondRow.map((faq) => (
            <FaqCard key={faq.id} faq={faq} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
      </div>
    </section>
  );
}

const FaqCard = ({ faq }: { faq: FaqCardInterface }) => {
  return (
    <Card className="border-border/50 mx-auto w-fit shadow-sm sm:w-sm">
      <CardHeader>
        <CardTitle className="flex items-start gap-3">
          <HelpCircle className="text-primary size-5" />
          <span className="text-sm">{faq.question}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{faq.answer}</p>
      </CardContent>
    </Card>
  );
};
