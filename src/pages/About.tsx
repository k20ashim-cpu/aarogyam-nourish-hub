import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, Award, Users } from "lucide-react";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
          
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Leaf className="h-4 w-4" />
                <span>Our Story</span>
              </div>
              <h1 className="mb-6 font-display text-4xl font-bold leading-tight md:text-5xl">
                About <span className="text-gradient-nature">Aarogyam Agencies</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We are dedicated to bringing you the finest organic and natural food products, 
                sourced directly from trusted farmers and producers across India.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <h2 className="font-display text-3xl font-bold">
                    Our <span className="text-gradient-nature">Mission</span>
                  </h2>
                  <p className="text-muted-foreground">
                    At Aarogyam Agencies, our mission is simple: to make healthy, organic food 
                    accessible to everyone. We believe that good health starts with what you eat, 
                    and we're committed to providing products that nourish your body naturally.
                  </p>
                  <p className="text-muted-foreground">
                    We work directly with farmers who share our vision of sustainable agriculture 
                    and chemical-free farming practices. Every product in our collection is 
                    carefully selected to ensure it meets our high standards for quality and purity.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-primary/10 p-4 text-center">
                      <span className="text-3xl font-bold text-primary">100%</span>
                      <span className="text-sm text-muted-foreground">Organic</span>
                    </div>
                    <div className="flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-secondary/10 p-4 text-center">
                      <span className="text-3xl font-bold text-secondary">50+</span>
                      <span className="text-sm text-muted-foreground">Products</span>
                    </div>
                    <div className="flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-accent/10 p-4 text-center">
                      <span className="text-3xl font-bold text-accent">1000+</span>
                      <span className="text-sm text-muted-foreground">Customers</span>
                    </div>
                    <div className="flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-primary/10 p-4 text-center">
                      <span className="text-3xl font-bold text-primary">5+</span>
                      <span className="text-sm text-muted-foreground">Years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold">
                Our <span className="text-gradient-nature">Values</span>
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                These core values guide everything we do at Aarogyam Agencies.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display font-semibold">Purity</h3>
                  <p className="text-sm text-muted-foreground">
                    100% natural and organic products with no additives or preservatives.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                    <Heart className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="mb-2 font-display font-semibold">Health</h3>
                  <p className="text-sm text-muted-foreground">
                    Products that promote wellness and support a healthy lifestyle.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 font-display font-semibold">Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display font-semibold">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Supporting local farmers and sustainable farming practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
