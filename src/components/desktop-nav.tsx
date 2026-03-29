"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Droplets,
  PenLine,
  HandHeart,
  Star,
  Sparkles,
  Users,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/manuscript", label: "Manuscript", icon: BookOpen },
  { href: "/journey", label: "7-Day Journey", icon: Compass },
  { href: "/prayer", label: "One-Minute Prayer", icon: HandHeart },
  { href: "/ritual", label: "Sacred Ritual", icon: Droplets },
  { href: "/journal", label: "Journal", icon: PenLine },
  { href: "/testimonials", label: "Testimonials", icon: Star },
  { href: "/revelations", label: "Revelations", icon: Sparkles },
  { href: "/community", label: "Community", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-sacred-dark/80 backdrop-blur-xl border-r border-gold/10 z-50">
      <div className="p-6 border-b border-gold/10">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-ivory leading-tight">
              Sacred Grotto
            </h2>
            <p className="text-[10px] text-gold/60 uppercase tracking-widest">
              Manuscript
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                  active
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "text-muted-foreground hover:text-ivory hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gold/10">
        <div className="px-3 py-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Sacred Grotto Manuscript
          </p>
          <p className="text-[10px] text-gold/40 mt-1">Premium Members Area</p>
        </div>
      </div>
    </aside>
  );
}
