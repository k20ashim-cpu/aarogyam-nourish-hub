import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/products/ProductGrid";
import { useProducts } from "@/hooks/useProducts";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Popular <span className="text-gradient-warm">Dishes</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Our customers' favorites, crafted with love
            </p>
          </div>
          <Link to="/menu">
            <Button variant="ghost" className="gap-2">
              View All Menu
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <ProductGrid products={featuredProducts} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default FeaturedProducts;