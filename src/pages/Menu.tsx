import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryFilter from "@/components/products/CategoryFilter";
import { useProducts, useCategories } from "@/hooks/useProducts";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: products, isLoading } = useProducts(selectedCategory);
  const { data: categories = [] } = useCategories();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-12 md:py-16">
          <div className="container">
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Our <span className="text-gradient-warm">Menu</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              Explore our delicious selection of dishes
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container">
            <div className="mb-8">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <ProductGrid products={products} isLoading={isLoading} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;