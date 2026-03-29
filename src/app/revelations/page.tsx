"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { revelations } from "@/lib/content";

export default function RevelationsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <AppShell>
      <PageHeader
        title="The Revelations"
        subtitle="Five sacred truths that change everything"
        icon={<Sparkles className="w-6 h-6" />}
      />

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Card className="bg-sacred-dark/60 border-gold/10 glow-gold">
          <CardContent className="p-5 text-center">
            <p className="text-ivory/80 text-sm leading-relaxed max-w-md mx-auto">
              Within the Sacred Grotto Manuscript lie five revelations — truths
              so profound that they have the power to reshape your understanding
              of healing, faith, and divine connection.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Revelation Cards */}
      <div className="space-y-4">
        {revelations.map((rev, i) => {
          const isOpen = expanded === rev.id;
          return (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Card
                className={`border transition-all duration-500 ${
                  isOpen
                    ? "bg-gradient-to-br from-gold/10 to-gold/5 border-gold/20 glow-gold"
                    : "bg-sacred-dark/40 border-gold/10 hover:border-gold/20"
                }`}
              >
                <CardContent className="p-0">
                  {/* Header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : rev.id)}
                    className="w-full p-5 text-left flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                      <span className="text-gold font-heading font-bold text-lg">
                        {rev.id}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-ivory font-heading font-semibold text-base mb-0.5">
                        {rev.title}
                      </h3>
                      <p className="text-gold/50 text-xs">{rev.subtitle}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gold/40 flex-shrink-0 transition-transform duration-300 mt-1 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="h-px bg-gold/10 mb-4" />
                          {rev.content.split("\n\n").map((p, j) => (
                            <p
                              key={j}
                              className="text-ivory/75 text-sm leading-[1.8] mb-4 last:mb-0"
                            >
                              {p}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </AppShell>
  );
}
