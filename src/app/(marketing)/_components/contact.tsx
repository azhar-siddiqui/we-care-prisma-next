import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div>
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1"
            >
              Get In Touch
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Lab?</h2>
            <p className="text-muted-foreground mb-8">
              Contact us to learn more about how LabFlow can help streamline your laboratory
              operations.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <Mail className="text-primary size-4" />
                </div>
                <div>
                  <h3 className="mb-1 font-medium">Email Us</h3>
                  <p className="text-muted-foreground">info@labflow.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <Phone className="text-primary size-4" />
                </div>
                <div>
                  <h3 className="mb-1 font-medium">Call Us</h3>
                  <p className="text-muted-foreground">+91 7558380826</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <MapPin className="text-primary size-4" />
                </div>
                <div>
                  <h3 className="mb-1 font-medium">Visit Us</h3>
                  <p className="text-muted-foreground">
                    123 Innovation Drive, San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" className="border-input mt-1.5" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="border-input mt-1.5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    className="border-input mt-1.5"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your laboratory needs..."
                    className="border-input mt-1.5 min-h-32 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="!rounded-button w-full cursor-pointer whitespace-nowrap"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
