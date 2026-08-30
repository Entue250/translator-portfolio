"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCircle,
  BarChart3,
  Briefcase,
  Languages,
  History,
  GraduationCap,
  Award,
  FolderKanban,
  MessageSquareQuote,
  Inbox,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/messages", label: "Inbox", icon: Inbox },
  { href: "/admin/profile", label: "Profile", icon: UserCircle },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/languages", label: "Languages", icon: Languages },
  { href: "/admin/experience", label: "Experience", icon: History },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/projects", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/references", label: "References", icon: MessageSquareQuote },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="px-5 py-5 border-b border-slate-100">
        <span className="text-sm font-semibold text-slate-900">Portfolio admin</span>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-100 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <ExternalLink className="h-4 w-4" />
          View live site
        </Link>
      </div>
    </aside>
  );
}
