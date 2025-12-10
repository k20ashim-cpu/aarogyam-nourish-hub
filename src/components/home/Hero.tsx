import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24 lg:py-32">
      {/* Decorative Elements */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute right-1/4 top-1/4 h-32 w-32 rounded-full bg-accent/15 blur-2xl" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Fresh & Flavorful</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Taste the{" "}
            <span className="text-gradient-warm">Extraordinary</span>
            <br />
            Delivered Fresh
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground md:text-xl">
            Experience bold flavors crafted with passion. From sizzling mains to sweet treats, 
            every bite is a celebration.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/menu">
              <Button size="lg" className="gap-2 bg-gradient-warm px-8 shadow-warm transition-all hover:scale-105">
                Order Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="px-8">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Menu Items</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">4.9</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;