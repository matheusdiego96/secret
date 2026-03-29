"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { HandHeart, Play, Pause, RotateCcw, Check, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { addPrayerSession, getPrayerSessions } from "@/lib/storage";
import { oneMinutePrayer, additionalPrayers } from "@/lib/content";

export default function PrayerPage() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [totalSessions, setTotalSessions] = useState(0);
  const [expandedPrayer, setExpandedPrayer] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTotalSessions(getPrayerSessions());
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            addPrayerSession();
            setTotalSessions(getPrayerSessions());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleStart = useCallback(() => setIsRunning(true), []);
  const handlePause = useCallback(() => setIsRunning(false), []);
  const handleReset = useCallback(() => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeLeft(60);
  }, []);

  const progress = ((60 - timeLeft) / 60) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <AppShell>
      <PageHeader
        title="One-Minute Prayer"
        subtitle="A sacred moment of connection and blessing"
        icon={<HandHeart className="w-6 h-6" />}
      />

      {/* Timer Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Card className="bg-sacred-dark/60 border-gold/10 glow-gold overflow-hidden">
          <CardContent className="p-8 text-center">
            {/* Timer circle */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(201, 168, 76, 0.1)"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(201, 168, 76, 0.8)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 2.83} ${283 - progress * 2.83}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {isComplete ? (
                  <Check className="w-12 h-12 text-gold" />
                ) : (
                  <>
                    <span className="text-ivory font-heading text-4xl font-bold">
                      {minutes}:{seconds.toString().padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground text-xs mt-1">
                      {isRunning ? "Praying..." : "Ready"}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Controls */}
            {isComplete ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 className="text-gold font-heading text-xl font-semibold mb-2">
                  Prayer Complete
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  The blessing is sealed within you. Carry this peace forward.
                </p>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-gold/20 text-gold hover:bg-gold/10"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Pray Again
                </Button>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                {!isRunning ? (
                  <Button
                    onClick={handleStart}
                    className="bg-gold hover:bg-gold-light text-sacred-black px-6"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {timeLeft < 60 ? "Resume" : "Begin Prayer"}
                  </Button>
                ) : (
                  <Button
                    onClick={handlePause}
                    variant="outline"
                    className="border-gold/20 text-gold hover:bg-gold/10 px-6"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                {timeLeft < 60 && !isRunning && (
                  <Button
                    onClick={handleReset}
                    variant="ghost"
                    className="text-muted-foreground"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}

            <p className="text-muted-foreground/50 text-xs mt-4">
              {totalSessions} prayer{totalSessions !== 1 ? "s" : ""} completed
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Prayer Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="bg-sacred-dark/40 border-gold/10">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
              {oneMinutePrayer.instruction}
            </p>

            <div className="border-l-2 border-gold/30 pl-4 mb-5">
              {oneMinutePrayer.prayer.split("\n").map((line, i) => (
                <p
                  key={i}
                  className={`text-ivory/80 text-sm italic leading-loose ${
                    line.trim() === "" ? "h-3" : ""
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="h-px bg-gold/10 my-4" />

            <p className="text-muted-foreground text-sm leading-relaxed italic">
              {oneMinutePrayer.closing}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Prayers Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-5 h-5 text-gold" />
          <h2 className="text-ivory font-heading font-semibold text-lg">
            Additional Prayers
          </h2>
        </div>
        <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
          Sacred prayers for specific moments and seasons of your journey. Each
          prayer is designed for a particular need — choose the one that speaks
          to where you are today.
        </p>

        <div className="space-y-3">
          {additionalPrayers.map((ap, i) => {
            const isOpen = expandedPrayer === ap.id;
            return (
              <motion.div
                key={ap.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
              >
                <Card
                  className={`border transition-all duration-300 ${
                    isOpen
                      ? "bg-gradient-to-br from-gold/10 to-gold/5 border-gold/20"
                      : "bg-sacred-dark/40 border-gold/10 hover:border-gold/20"
                  }`}
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() =>
                        setExpandedPrayer(isOpen ? null : ap.id)
                      }
                      className="w-full p-4 text-left"
                    >
                      <h3 className="text-ivory font-heading font-semibold text-sm mb-1">
                        {ap.title}
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        {ap.context}
                      </p>
                    </button>

                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 pt-0">
                          <div className="h-px bg-gold/10 mb-4" />
                          <div className="border-l-2 border-gold/30 pl-4">
                            {ap.prayer.split("\n").map((line, j) => (
                              <p
                                key={j}
                                className={`text-ivory/80 text-sm italic leading-loose ${
                                  line.trim() === "" ? "h-3" : ""
                                }`}
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AppShell>
  );
}
