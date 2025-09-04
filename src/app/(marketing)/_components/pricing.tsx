'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('monthly');
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1"
          >
            Pricing
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground mb-8">
            Choose the plan that best fits your laboratory&apos;s needs and scale as you grow.
          </p>

          <Tabs
            defaultValue="monthly"
            className="mx-auto w-full max-w-xs"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly (20% off)</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              name: 'Basic',
              price: { monthly: 99, yearly: 79 },
              description: 'Perfect for small labs just getting started',
              features: [
                'Patient report generation',
                'Basic inventory tracking',
                'Up to 3 user accounts',
                'Email support',
                '1GB storage',
              ],
              popular: false,
              cta: 'Get Started',
            },
            {
              name: 'Professional',
              price: { monthly: 199, yearly: 159 },
              description: 'Ideal for growing labs with multiple technicians',
              features: [
                'Everything in Basic',
                'Advanced report customization',
                'Full inventory management',
                'Up to 10 user accounts',
                'Priority email & phone support',
                '10GB storage',
                'API access',
              ],
              popular: true,
              cta: 'Get Started',
            },
            {
              name: 'Enterprise',
              price: { monthly: 399, yearly: 319 },
              description: 'For large labs with complex requirements',
              features: [
                'Everything in Professional',
                'Unlimited user accounts',
                'Custom integrations',
                'Dedicated account manager',
                '24/7 premium support',
                'Unlimited storage',
                'Advanced analytics',
                'Custom report builder',
              ],
              popular: false,
              cta: 'Contact Sales',
            },
          ].map((plan, index) => (
            <Card
              key={`${plan}-${index}`}
              className={`border-border/50 overflow-hidden shadow-sm ${
                plan.popular ? 'ring-primary ring-2' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground py-1 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${activeTab === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={`${feature}-${featureIndex}`} className="flex items-start gap-3">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button
                  className="!rounded-button w-full cursor-pointer whitespace-nowrap"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Need a custom solution?{' '}
            <a href="#contact" className="text-primary cursor-pointer font-medium hover:underline">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
