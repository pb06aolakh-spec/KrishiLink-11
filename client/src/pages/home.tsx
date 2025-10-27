import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Shield,
  Clock,
  Users,
  CheckCircle2,
  Tractor,
  Combine,
  Droplets,
  Wrench,
  ArrowRight,
} from "lucide-react";
import heroImage from "@assets/generated_images/Hero_image_wheat_field_tractor_cb28ae53.png";
import tractorImage from "@assets/generated_images/Category_image_red_tractor_86892707.png";
import harvesterImage from "@assets/generated_images/Category_image_combine_harvester_e6a921ee.png";
import irrigationImage from "@assets/generated_images/Category_image_irrigation_system_dd56a693.png";
import tillerImage from "@assets/generated_images/Category_image_soil_tiller_4e031213.png";
import handToolsImage from "@assets/generated_images/Category_image_hand_tools_d1e09cf5.png";
import trustImage from "@assets/generated_images/Trust_section_handshake_image_dbc73b75.png";
import browseImage from "@assets/generated_images/CTA_image_browsing_equipment_52758059.png";

export default function Home() {
  const categories = [
    { name: "Tractors", icon: Tractor, count: "150+", image: tractorImage },
    { name: "Harvesters", icon: Combine, count: "80+", image: harvesterImage },
    { name: "Irrigation", icon: Droplets, count: "120+", image: irrigationImage },
    { name: "Tillers", icon: Wrench, count: "90+", image: tillerImage },
    { name: "Hand Tools", icon: Wrench, count: "200+", image: handToolsImage },
    { name: "Storage", icon: Tractor, count: "60+", image: tractorImage },
  ];

  const features = [
    {
      icon: Search,
      title: "Browse Equipment",
      description: "Search through hundreds of verified farm equipment listings in your area",
    },
    {
      icon: CheckCircle2,
      title: "Book & Confirm",
      description: "Connect with owners, discuss terms, and confirm your rental dates easily",
    },
    {
      icon: Clock,
      title: "Pick Up & Use",
      description: "Collect the equipment and boost your farm productivity without ownership costs",
    },
  ];

  const trustItems = [
    "Verified equipment owners",
    "Quality inspection before listing",
    "Secure payment processing",
    "Flexible rental terms",
    "24/7 customer support",
    "Insurance coverage available",
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Agricultural field with tractor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Rent & Share Farm Equipment
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
            Access quality machinery without the ownership cost. Connect with trusted farmers in your community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/browse">
              <Button
                size="lg"
                variant="default"
                className="bg-primary text-primary-foreground px-8 py-6 text-lg font-semibold backdrop-blur-sm"
                data-testid="button-hero-browse"
              >
                Browse Equipment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/list">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold bg-background/20 backdrop-blur-sm border-2 text-white hover:bg-background/30"
                data-testid="button-hero-list"
              >
                List Your Equipment
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 justify-center text-sm md:text-base">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>500+ Tools Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Verified Owners</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Flexible Terms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the right equipment for every farming need
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link key={category.name} href="/browse">
                <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer h-full" data-testid={`card-category-${category.name.toLowerCase()}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <category.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with KrishiLink in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={trustImage}
                alt="Farmers partnership"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built on Trust & Safety
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We prioritize the safety and satisfaction of our farming community through rigorous verification and support systems.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trustItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden hover-elevate transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-square md:aspect-auto overflow-hidden">
                  <img
                    src={browseImage}
                    alt="Browse equipment"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4">Looking to Rent?</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Browse hundreds of verified equipment listings and find exactly what you need for your farm.
                  </p>
                  <Link href="/browse">
                    <Button className="w-full" size="lg" data-testid="button-cta-browse">
                      Browse Equipment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>

            <Card className="overflow-hidden hover-elevate transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-square md:aspect-auto overflow-hidden">
                  <img
                    src={tractorImage}
                    alt="List equipment"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4">Have Equipment to Share?</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Earn extra income by renting out your idle farming equipment to trusted farmers.
                  </p>
                  <Link href="/list">
                    <Button className="w-full" size="lg" variant="default" data-testid="button-cta-list">
                      List Your Equipment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-sm md:text-base opacity-90">Equipment Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-sm md:text-base opacity-90">Active Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-sm md:text-base opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
