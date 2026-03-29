"use client";

import { AuthGuard } from "./auth-guard";
import { BottomNav } from "./bottom-nav";
import { DesktopNav } from "./desktop-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-sacred-black bg-parchment-texture">
        <DesktopNav />
        <main className="md:ml-64 min-h-screen pb-24 md:pb-8">
          <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
            {children}
          </div>
        </main>
        <BottomNav />
      </div>
    </AuthGuard>
  );
}
