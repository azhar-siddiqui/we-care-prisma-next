import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, FlaskConical, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <FlaskConical className="text-primary text-xl" />
              <span className="text-xl font-bold">We Care</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Streamlining laboratory operations with innovative software solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                className="bg-primary/10 text-primary hover:bg-primary/20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
              >
                <Twitter className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="bg-primary/10 text-primary hover:bg-primary/20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/"
                className="bg-primary/10 text-primary hover:bg-primary/20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="bg-primary/10 text-primary hover:bg-primary/20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
              >
                <Instagram className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Product</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Features
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Pricing
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Integrations
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Case Studies
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  API Documentation
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Blog
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Help Center
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Webinars
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Community
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Events
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  About Us
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Careers
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Contact Us
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Partners
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0 transition-colors"
                >
                  Press Kit
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-sm">© 2025 LabFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <Button
              variant="link"
              className="text-muted-foreground hover:text-primary cursor-pointer p-0 text-sm transition-colors"
            >
              Privacy Policy
            </Button>
            <Button
              variant="link"
              className="text-muted-foreground hover:text-primary cursor-pointer p-0 text-sm transition-colors"
            >
              Terms of Service
            </Button>
            <Button
              variant="link"
              className="text-muted-foreground hover:text-primary cursor-pointer p-0 text-sm transition-colors"
            >
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
