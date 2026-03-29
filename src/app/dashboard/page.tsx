"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Compass,
  HandHeart,
  Droplets,
  PenLine,
  Star,
  Sparkles,
  ChevronRight,
  Flame,
  Trophy,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/app-shell";
import {
  getEmail,
  getCompletedDays,
  getReadChapters,
  getRitualCompletions,
  getPrayerSessions,
  getJournalEntries,
  getStreak,
} from "@/lib/storage";
import { inspirationalQuotes } from "@/lib/content";

const quickLinks = [
  { href: "/manuscript", label: "Read Manuscript", icon: BookOpen, color: "text-gold" },
  { href: "/journey", label: "7-Day Journey", icon: Compass, color: "text-gold" },
  { href: "/prayer", label: "One-Minute Prayer", icon: HandHeart, color: "text-gold" },
  { href: "/ritual", label: "Sacred Ritual", icon: Droplets, color: "text-gold" },
  { href: "/journal", label: "Journal", icon: PenLine, color: "text-gold" },
  { href: "/testimonials", label: "Testimonials", icon: Star, color: "text-gold" },
  { href: "/revelations", label: "Revelations", icon: Sparkles, color: "text-gold" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [readChapters, setReadChapters] = useState<number[]>([]);
  const [ritualCount, setRitualCount] = useState(0);
  const [prayerCount, setPrayerCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setEmail(getEmail() || "");
    setCompletedDays(getCompletedDays());
    setReadChapters(getReadChapters());
    setRitualCount(getRitualCompletions().length);
    setPrayerCount(getPrayerSessions());
    setJournalCount(getJournalEntries().length);
    setStreak(getStreak());
  }, []);

  const quote = useMemo(
    () =>
      inspirationalQuotes[
        Math.floor(Math.random() * inspirationalQuotes.length)
      ],
    []
  );

  const firstName = email.split("@")[0] || "Seeker";
  const totalChapters = 9;
  const journeyProgress = Math.round((completedDays.length / 7) * 100);
  const manuscriptProgress = Math.round((readChapters.length / totalChapters) * 100);
  const totalProgress = Math.round(
    (completedDays.length + readChapters.length + ritualCount + prayerCount) /
      (7 + totalChapters + 7 + 7) *
      100
  );

  return (
    <AppShell>
      {/* Greeting */}
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-8">
        <p className="text-gold/60 text-xs uppercase tracking-[0.2em] mb-1">
          Welcome back
        </p>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-ivory">
          Peace be with you, {firstName}
        </h1>
      </motion.div>

      {/* Quote Card */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <Card className="bg-sacred-dark/60 border-gold/10 glow-gold overflow-hidden">
          <CardContent className="p-5 relative">
            <div className="absolute top-3 right-4 text-gold/10 text-5xl font-heading">&ldquo;</div>
            <p className="text-ivory/80 text-sm italic leading-relaxed pr-8">
              {quote.text}
            </p>
            <p className="text-gold/50 text-xs mt-2">— {quote.author}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Progress */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-6"
      >
        <Card className="bg-sacred-dark/60 border-gold/10">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-ivory font-medium text-sm">
                Overall Progress
              </h3>
              <span className="text-gold text-sm font-semibold">
                {totalProgress}%
              </span>
            </div>
            <Progress
              value={totalProgress}
              className="h-2 bg-sacred-gray [&>div]:bg-gradient-to-r [&>div]:from-gold-dark [&>div]:to-gold-light"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 gap-3 mb-6"
      >
        <Card className="bg-sacred-dark/60 border-gold/10">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2">
              <Compass className="w-5 h-5 text-gold" />
            </div>
            <p className="text-ivory font-heading text-xl font-bold">
              {completedDays.length}/7
            </p>
            <p className="text-muted-foreground text-xs">Journey Days</p>
            <Progress
              value={journeyProgress}
              className="h-1 mt-2 bg-sacred-gray [&>div]:bg-gold"
            />
          </CardContent>
        </Card>
        <Card className="bg-sacred-dark/60 border-gold/10">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <p className="text-ivory font-heading text-xl font-bold">
              {readChapters.length}/{totalChapters}
            </p>
            <p className="text-muted-foreground text-xs">Chapters Read</p>
            <Progress
              value={manuscriptProgress}
              className="h-1 mt-2 bg-sacred-gray [&>div]:bg-gold"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Streak & Stats */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <Card className="bg-sacred-dark/60 border-gold/10">
          <CardContent className="p-3 text-center">
            <Flame className="w-5 h-5 text-gold mx-auto mb-1" />
            <p className="text-ivory font-bold text-lg">{streak}</p>
            <p className="text-muted-foreground text-[10px]">Day Streak</p>
          </CardContent>
        </Card>
        <Card className="bg-sacred-dark/60 border-gold/10">
          <CardContent className="p-3 text-center">
            <HandHeart className="w-5 h-5 text-gold mx-auto mb-1" />
            <p className="text-ivory font-bold text-lg">{prayerCount}</p>
            <p className="text-muted-foreground text-[10px]">Prayers</p>
          </CardContent>
        </Card>
        <Card className="bg-sacred-dark/60 border-gold/10">
          <CardContent className="p-3 text-center">
            <Trophy className="w-5 h-5 text-gold mx-auto mb-1" />
            <p className="text-ivory font-bold text-lg">{ritualCount}</p>
            <p className="text-muted-foreground text-[10px]">Rituals</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Continue Journey CTA */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-6"
      >
        <Link href={completedDays.length < 7 ? "/journey" : "/manuscript"}>
          <Card className="bg-gradient-to-br from-gold/15 to-gold/5 border-gold/20 glow-gold hover:from-gold/20 hover:to-gold/10 transition-all duration-300 cursor-pointer">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-ivory font-heading font-semibold text-base mb-1">
                  {completedDays.length < 7
                    ? `Continue Day ${completedDays.length + 1}`
                    : "Continue Reading"}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {completedDays.length < 7
                    ? "Your sacred journey awaits"
                    : "Explore the full manuscript"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-gold" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Quick Access */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <h2 className="text-ivory font-heading font-semibold text-lg mb-3">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            >
              <Link href={link.href}>
                <Card className="bg-sacred-dark/40 border-gold/5 hover:border-gold/20 hover:bg-sacred-dark/60 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                      <link.icon className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-ivory/80 text-sm group-hover:text-ivory transition-colors">
                      {link.label}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AppShell>
  );
}
