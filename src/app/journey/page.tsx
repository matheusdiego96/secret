"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Check,
  ChevronLeft,
  ChevronRight,
  BookHeart,
  HandHeart,
  Lightbulb,
  PenLine,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { getCompletedDays, completeDay } from "@/lib/storage";
import { journeyDays } from "@/lib/content";

export default function JourneyPage() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  useEffect(() => {
    setCompletedDays(getCompletedDays());
  }, []);

  const handleComplete = (day: number) => {
    completeDay(day);
    setCompletedDays(getCompletedDays());
  };

  const progress = Math.round((completedDays.length / 7) * 100);
  const dayData = activeDay ? journeyDays.find((d) => d.day === activeDay) : null;

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        {!activeDay ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PageHeader
              title="7-Day Sacred Journey"
              subtitle="Seven days of guided spiritual transformation"
              icon={<Compass className="w-6 h-6" />}
            />

            {/* Progress */}
            <Card className="bg-sacred-dark/60 border-gold/10 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground text-xs">
                    Journey Progress
                  </span>
                  <span className="text-gold text-xs font-medium">
                    {completedDays.length}/7 days
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="h-1.5 bg-sacred-gray [&>div]:bg-gold"
                />
                {completedDays.length === 7 && (
                  <p className="text-gold text-xs mt-2 text-center">
                    Journey Complete — You are transformed
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Day Cards */}
            <div className="space-y-3">
              {journeyDays.map((day, i) => {
                const completed = completedDays.includes(day.day);
                const isNext =
                  !completed &&
                  (day.day === 1 || completedDays.includes(day.day - 1));
                return (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card
                      className={`border transition-all duration-300 cursor-pointer group ${
                        isNext
                          ? "bg-gradient-to-br from-gold/10 to-gold/5 border-gold/20 glow-gold"
                          : completed
                          ? "bg-sacred-dark/60 border-gold/15"
                          : "bg-sacred-dark/40 border-gold/5"
                      }`}
                      onClick={() => setActiveDay(day.day)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center border ${
                              completed
                                ? "bg-gold/20 border-gold/30"
                                : isNext
                                ? "bg-gold/10 border-gold/20"
                                : "bg-sacred-gray/30 border-gold/5"
                            }`}
                          >
                            {completed ? (
                              <Check className="w-5 h-5 text-gold" />
                            ) : (
                              <span className="text-gold/70 text-sm font-heading font-bold">
                                {day.day}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gold/40 text-[10px] uppercase tracking-widest">
                              Day {day.day}
                            </p>
                            <h3 className="text-ivory font-heading font-semibold text-sm group-hover:text-gold transition-colors truncate">
                              {day.title}
                            </h3>
                            {completed && (
                              <p className="text-gold/50 text-[10px] mt-0.5">
                                Completed
                              </p>
                            )}
                            {isNext && (
                              <p className="text-gold/70 text-[10px] mt-0.5">
                                Ready to begin
                              </p>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveDay(null)}
              className="text-gold/60 hover:text-gold mb-4 -ml-2"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to journey
            </Button>

            <div className="mb-6 text-center">
              <p className="text-gold/50 text-xs uppercase tracking-widest mb-2">
                Day {dayData?.day}
              </p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-ivory">
                {dayData?.title}
              </h1>
              <div className="mt-3 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </div>

            {/* Teaching */}
            <Card className="bg-sacred-dark/60 border-gold/10 mb-4">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookHeart className="w-4 h-4 text-gold" />
                  <h3 className="text-gold text-xs uppercase tracking-widest font-medium">
                    Teaching
                  </h3>
                </div>
                <p className="text-ivory/80 text-sm leading-relaxed">
                  {dayData?.teaching}
                </p>
              </CardContent>
            </Card>

            {/* Prayer */}
            <Card className="bg-sacred-dark/60 border-gold/10 mb-4">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <HandHeart className="w-4 h-4 text-gold" />
                  <h3 className="text-gold text-xs uppercase tracking-widest font-medium">
                    Prayer & Focus
                  </h3>
                </div>
                <p className="text-ivory/80 text-sm leading-relaxed italic">
                  {dayData?.prayer}
                </p>
              </CardContent>
            </Card>

            {/* Action */}
            <Card className="bg-sacred-dark/60 border-gold/10 mb-4">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-gold" />
                  <h3 className="text-gold text-xs uppercase tracking-widest font-medium">
                    Action Step
                  </h3>
                </div>
                <p className="text-ivory/80 text-sm leading-relaxed">
                  {dayData?.action}
                </p>
              </CardContent>
            </Card>

            {/* Reflection */}
            <Card className="bg-sacred-dark/60 border-gold/10 mb-6">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <PenLine className="w-4 h-4 text-gold" />
                  <h3 className="text-gold text-xs uppercase tracking-widest font-medium">
                    Reflection
                  </h3>
                </div>
                <p className="text-ivory/80 text-sm leading-relaxed">
                  {dayData?.reflection}
                </p>
              </CardContent>
            </Card>

            {/* Complete Button */}
            <div className="sticky bottom-20 md:bottom-4 z-10">
              <Card className="bg-sacred-dark/95 backdrop-blur-lg border-gold/10">
                <CardContent className="p-4 flex items-center justify-between">
                  {completedDays.includes(dayData?.day || 0) ? (
                    <div className="flex items-center gap-2 text-gold">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Day completed</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      Ready to complete?
                    </span>
                  )}
                  <Button
                    onClick={() => handleComplete(dayData?.day || 0)}
                    disabled={completedDays.includes(dayData?.day || 0)}
                    className="bg-gold hover:bg-gold-light text-sacred-black text-sm"
                    size="sm"
                  >
                    {completedDays.includes(dayData?.day || 0)
                      ? "Completed"
                      : "Complete Day"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
