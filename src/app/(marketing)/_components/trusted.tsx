import { trustedData } from '@/data/marketing-data';

export default function Trusted() {
  return (
    <section className="bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <p className="text-muted-foreground text-sm font-medium">
            TRUSTED BY LEADING HEALTHCARE INSTITUTIONS
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {trustedData.map((partner, index) => (
            <div key={`${index}-${partner.name}`} className="flex items-center gap-2">
              <partner.icon className="text-primary/70 h-6 w-6" />
              <span className="text-lg font-semibold">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
