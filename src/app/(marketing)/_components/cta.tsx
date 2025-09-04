import { Button } from '@/components/ui/button';

export default function Cta() {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Get Started?</h2>
        <p className="text-primary-foreground/90 mx-auto mb-8 max-w-xl">
          Join thousands of laboratories that have transformed their operations with LabFlow.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            variant="secondary"
            size="lg"
            className="!rounded-button cursor-pointer whitespace-nowrap"
          >
            Start Free Trial
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 !rounded-button cursor-pointer bg-transparent whitespace-nowrap"
          >
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
