"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Check, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { getRitualCompletions, completeRitual } from "@/lib/storage";
import { sacredWaterRitual } from "@/lib/content";

export default function RitualPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [ritualCount, setRitualCount] = useState(0);
  const [todayComplete, setTodayComplete] = useState(false);

  useEffect(() => {
    const completions = getRitualCompletions();
    setRitualCount(completions.length);
    const today = new Date().toISOString().split("T")[0];
    setTodayComplete(completions.includes(today));
  }, []);

  const toggleStep = (id: number) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCompleteRitual = () => {
    completeRitual();
    setTodayComplete(true);
    setRitualCount((prev) => prev + 1);
  };

  const allStepsComplete =
    completedSteps.length === sacredWaterRitual.steps.length;

  return (
    <AppShell>
      <PageHeader
        title="Sacred Water Ritual"
        subtitle="Your daily ceremony of blessing and transformation"
        icon={<Droplets className="w-6 h-6" />}
      />

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Card className="bg-sacred-dark/60 border-gold/10">
          <CardContent className="p-5">
            <p className="text-ivory/80 text-sm leading-relaxed">
              {sacredWaterRitual.introduction}
            </p>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gold/5">
              <span className="text-muted-foreground text-xs">
                Completed {ritualCount} time{ritualCount !== 1 ? "s" : ""}
              </span>
              {todayComplete && (
                <span className="text-gold text-xs flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Done today
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Steps */}
      <div className="space-y-3 mb-6">
        {sacredWaterRitual.steps.map((step, i) => {
          const done = completedSteps.includes(step.id);
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <Card
                className={`border transition-all duration-300 cursor-pointer ${
                  done
                    ? "bg-gold/5 border-gold/20"
                    : "bg-sacred-dark/40 border-gold/5 hover:border-gold/15"
                }`}
                onClick={() => toggleStep(step.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {done ? (
                        <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-gold" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-gold/20 flex items-center justify-center">
                          <Circle className="w-3 h-3 text-gold/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gold/40 text-[10px] uppercase tracking-widest">
                          Step {step.id}
                        </span>
                      </div>
                      <h3
                        className={`font-heading font-semibold text-sm mb-1.5 ${
                          done ? "text-gold" : "text-ivory"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Complete Ritual */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="sticky bottom-20 md:bottom-4 z-10"
      >
        <Card className="bg-sacred-dark/95 backdrop-blur-lg border-gold/10">
          <CardContent className="p-4">
            {todayComplete ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-gold mb-1">
                  <Check className="w-5 h-5" />
                  <span className="font-heading font-semibold">
                    Today&apos;s Ritual Complete
                  </span>
                </div>
                <p className="text-muted-foreground text-xs">
                  The blessing is sealed within you
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-ivory text-sm font-medium">
                    {allStepsComplete
                      ? "All steps complete!"
                      : `${completedSteps.length}/${sacredWaterRitual.steps.length} steps`}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {allStepsComplete
                      ? "Seal your ritual"
                      : "Complete all steps to finish"}
                  </p>
                </div>
                <Button
                  onClick={handleCompleteRitual}
                  disabled={!allStepsComplete}
                  className="bg-gold hover:bg-gold-light text-sacred-black text-sm"
                  size="sm"
                >
                  Complete Ritual
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AppShell>
  );
}
