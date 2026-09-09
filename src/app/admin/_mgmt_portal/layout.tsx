import { AdminHeader } from "@/components/admin/AdminHeader";
import { requireAdminAuth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminAuth(); // Middleware check
  
  return (
    <div className="min-h-screen bg-stone-50">
      <AdminHeader />
      <div className="flex">
        <aside className="w-64 border-r border-stone-200 p-6">
          {/* Admin Navigation */}
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
