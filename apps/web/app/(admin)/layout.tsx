import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
