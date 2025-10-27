import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Users,
  Target,
  Heart,
  Shield,
  Clock,
  Handshake,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import trustImage from "@assets/generated_images/Trust_section_handshake_image_dbc73b75.png";

export default function About() {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "Building strong connections among farmers across India",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Verified owners and equipment for your peace of mind",
    },
    {
      icon: Handshake,
      title: "Fair Practices",
      description: "Transparent pricing and flexible rental terms for everyone",
    },
    {
      icon: TrendingUp,
      title: "Mutual Growth",
      description: "Helping farmers prosper through resource sharing",
    },
  ];

  const benefits = [
    "Access to modern equipment without ownership costs",
    "Earn extra income from idle machinery",
    "Verified users and quality-checked equipment",
    "Flexible rental periods from hours to months",
    "Direct communication between renters and owners",
    "Insurance coverage options available",
    "24/7 customer support for your needs",
    "Growing network of farmers across 50+ cities",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About KrishiLink</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            We're on a mission to make farming more accessible and profitable by connecting equipment owners with farmers who need them.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/browse">
              <Button size="lg" data-testid="button-about-browse">
                Browse Equipment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/list">
              <Button size="lg" variant="outline" data-testid="button-about-list">
                List Your Equipment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              </div>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  KrishiLink was born from a simple observation: many farmers own equipment that sits idle for most of the year, while others struggle to afford the machinery they need.
                </p>
                <p>
                  We bridge this gap by creating a trusted marketplace where farmers can rent or lend agricultural equipment, making farming more efficient and profitable for everyone.
                </p>
                <p>
                  Our platform empowers farmers to maximize the value of their investments while providing access to quality equipment without the burden of ownership costs.
                </p>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <img
                src={trustImage}
                alt="Farmers working together"
                className="rounded-lg w-full h-auto shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at KrishiLink
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive platform designed for the farming community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 p-4 rounded-lg hover-elevate transition-all">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Equipment Listed</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-sm opacity-90">Active Farmers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Cities Covered</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">₹5Cr+</div>
              <div className="text-sm opacity-90">Savings Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Whether you're looking to rent equipment or share your own, KrishiLink is here to support your farming journey. Join thousands of farmers who are already benefiting from our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-join-browse">
                Start Browsing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/list">
              <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-join-list">
                List Equipment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
