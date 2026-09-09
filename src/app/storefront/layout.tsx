import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import { AvocatoAssistant } from "@/components/shared/AvocatoAssistant";
import { getStorefrontConfig } from "@/lib/config";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas text-pitBrown">
      <Header />
      <main>{children}</main>
      <Footer />
      <AvocatoAssistant />
    </div>
  );
}
