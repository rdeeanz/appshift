"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, Settings, Users } from "lucide-react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/content", label: "Content", icon: FileText },
    { href: "/dashboard/users", label: "Users", icon: Users },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col">
      <div className="p-6 text-xl font-bold text-accent">⬡ AppShift Admin</div>
      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${pathname === link.href ? "bg-accent/10 text-accent" : "text-slate-400 hover:bg-slate-800 hover:text-slate-50"}`}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
