import { Link } from "wouter";
import { Tractor, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Tractor className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">KrishiLink</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering farmers by making quality agricultural equipment accessible and affordable through our trusted rental marketplace.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-browse">
                    Browse Equipment
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/list">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-list">
                    List Equipment
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                    About Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@krishilink.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Stay Connected</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get updates on new equipment and farming tips
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                className="text-sm"
                data-testid="input-newsletter-email"
              />
              <Button size="sm" data-testid="button-newsletter-submit">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 KrishiLink. Connecting farmers across India.</p>
        </div>
      </div>
    </footer>
  );
}
