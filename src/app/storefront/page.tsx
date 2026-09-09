import { getStorefrontConfig } from "@/lib/config";
import { HeroBanner } from "@/components/storefront/HeroBanner";
import { CollectionGrid } from "@/components/storefront/CollectionGrid";
import { ProductCarousel } from "@/components/storefront/ProductCarousel";
import { RoutineShowcase } from "@/components/storefront/RoutineShowcase";

export default async function Home() {
  const config = await getStorefrontConfig();
  
  return (
    <div className="space-y-16">
      {/* Dynamic Hero Section */}
      {config.sections.find(s => s.type === "hero") && (
        <HeroBanner data={config.sections[0]} />
      )}

      {/* Collection Grids */}
      {config.sections.find(s => s.type === "collection-grid") && (
        <CollectionGrid data={config.sections[1]} />
      )}

      {/* Product Carousel */}
      {config.sections.find(s => s.type === "product-carousel") && (
        <ProductCarousel data={config.sections[2]} />
      )}

      {/* Routine Showcase */}
      {config.sections.find(s => s.type === "routine-showcase") && (
        <RoutineShowcase data={config.sections[3]} />
      )}

      {/* Value Props Strip */}
      <div className="bg-sageTint py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>🌿 100% Organic</div>
          <div>🚚 Free Shipping Over $50</div>
          <div>🐰 Cruelty-Free</div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Avocado Cosmetics | Organic Beauty Products",
    description: "Shop premium organic skincare, haircare & beauty products.",
    openGraph: {
      title: "Avocado Cosmetics",
      description: "Premium organic beauty products for your natural glow",
      images: ["/og-image.jpg"],
    },
  };
}

export async function generateStaticParams() {
  return []; // Dynamic routes handled by Next.js
}
