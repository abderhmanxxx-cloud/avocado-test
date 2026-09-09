import { notFound } from "next/navigation";
import { getPrismaClient } from "@/lib/prisma";
import { ProductGallery } from "@/components/storefront/ProductGallery";
import { ProductInfo } from "@/components/storefront/ProductInfo";
import { RelatedProducts } from "@/components/storefront/RelatedProducts";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prisma = getPrismaClient();
  
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { reviews: true, category: true },
  });

  if (!product) notFound();

  // Auto-calculate discount percentage
  const discountPercent = Math.ceil(
    ((product.originalPrice! - product.price) / product.originalPrice!) * 100
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGallery images={product.images} mainImage={product.mainImage} />
      
      <ProductInfo 
        name={product.name}
        price={product.price}
        originalPrice={product.originalPrice}
        discountPercent={discountPercent}
        description={product.description || ""}
        stock={product.stock}
      />

      {/* Reviews Section */}
      {product.reviews.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-serif mb-6">Customer Reviews</h3>
          {/* Review components here */}
        </div>
      )}

      {/* Related Products */}
      <RelatedProducts category={product.category.id} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prisma = getPrismaClient();
  
  const product = await prisma.product.findUnique({ where: { slug } });
  
  if (!product) return {};

  return {
    title: `${product.name} | Avocado Cosmetics`,
    description: product.metaDesc || product.description,
    openGraph: {
      images: [product.mainImage],
    },
  };
}

export async function generateStaticParams() {
  const prisma = getPrismaClient();
  const products = await prisma.product.findMany({ select: { slug: true } });
  
  return products.map(({ slug }) => ({ slug }));
}
