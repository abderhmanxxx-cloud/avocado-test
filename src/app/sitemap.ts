import { getPrismaClient } from "@/lib/prisma";

export default async function sitemap() {
  const prisma = getPrismaClient();
  
  // Products
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  });

  // Categories
  const categories = await prisma.category.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Routines
  const routines = await prisma.routine.findMany({
    where: { visibility: "PUBLIC" },
    select: { id: true, updatedAt: true },
  });

  return [
    { url: "/", lastModified: new Date() },
    ...products.map(({ slug }) => ({
      url: `/products/${slug}`,
      lastModified: new Date(),
    })),
    ...categories.map(({ slug }) => ({
      url: `/categories/${slug}`,
      lastModified: new Date(),
    })),
    ...routines.map(({ id }) => ({
      url: `/routines/${id}`,
      lastModified: new Date(),
    })),
  ];
}

export async function generateStaticParams() {
  return []; // Dynamic routes handled by Next.js
}
