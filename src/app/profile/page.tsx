"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  LogOut,
  BookOpen,
  Compass,
  HandHeart,
  Droplets,
  PenLine,
  Flame,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import {
  getEmail,
  clearSession,
  getCompletedDays,
  getReadChapters,
  getRitualCompletions,
  getPrayerSessions,
  getJournalEntries,
  getStreak,
} from "@/lib/storage";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [stats, setStats] = useState({
    days: 0,
    chapters: 0,
    rituals: 0,
    prayers: 0,
    entries: 0,
    streak: 0,
  });

  useEffect(() => {
    setEmail(getEmail() || "");
    setStats({
      days: getCompletedDays().length,
      chapters: getReadChapters().length,
      rituals: getRitualCompletions().length,
      prayers: getPrayerSessions(),
      entries: getJournalEntries().length,
      streak: getStreak(),
    });
  }, []);

  const handleLogout = () => {
    clearSession();
    router.replace("/");
  };

  const statCards = [
    { label: "Journey Days", value: `${stats.days}/7`, icon: Compass },
    { label: "Chapters Read", value: `${stats.chapters}/5`, icon: BookOpen },
    { label: "Rituals Done", value: stats.rituals, icon: Droplets },
    { label: "Prayers", value: stats.prayers, icon: HandHeart },
    { label: "Journal Entries", value: stats.entries, icon: PenLine },
    { label: "Day Streak", value: stats.streak, icon: Flame },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Your Profile"
        subtitle="Your sacred journey at a glance"
        icon={<User className="w-6 h-6" />}
      />

      {/* User Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Card className="bg-sacred-dark/60 border-gold/10 glow-gold">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-3">
              <span className="text-gold font-heading font-bold text-2xl">
                {email.charAt(0).toUpperCase()}
              </span>
            </div>
            <h3 className="text-ivory font-heading font-semibold text-lg mb-0.5">
              {email.split("@")[0]}
            </h3>
            <p className="text-muted-foreground text-xs">{email}</p>
            <p className="text-gold/50 text-[10px] uppercase tracking-widest mt-2">
              Premium Member
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <h2 className="text-ivory font-heading font-semibold text-lg mb-3">
          Progress Summary
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <Card className="bg-sacred-dark/40 border-gold/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="w-4 h-4 text-gold/60" />
                    <span className="text-muted-foreground text-xs">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-ivory font-heading text-xl font-bold">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/30"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
        <p className="text-center text-muted-foreground/30 text-[10px] mt-4">
          This will clear all local data and return you to the entry page
        </p>
      </motion.div>
    </AppShell>
  );
}
