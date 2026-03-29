"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { testimonials } from "@/lib/content";

const categories = [
  { key: "all", label: "All Stories" },
  { key: "healing", label: "Healing" },
  { key: "peace", label: "Peace" },
  { key: "prosperity", label: "Prosperity" },
  { key: "family", label: "Family" },
];

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  return (
    <AppShell>
      <PageHeader
        title="Testimonials"
        subtitle="Real stories of transformation and divine encounter"
        icon={<Star className="w-6 h-6" />}
      />

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 overflow-x-auto scrollbar-none"
      >
        <div className="flex gap-2 min-w-max pb-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat.key
                  ? "bg-gold/15 text-gold border border-gold/30"
                  : "bg-sacred-dark/40 text-muted-foreground border border-gold/5 hover:border-gold/15"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Testimonial Cards */}
      <div className="space-y-4">
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="bg-sacred-dark/40 border-gold/10 hover:border-gold/20 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold font-heading font-bold text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-ivory font-medium text-sm">{t.name}</p>
                    <p className="text-muted-foreground/50 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {t.location}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-gold/5 border border-gold/10 text-gold/70 text-[10px] uppercase tracking-wider capitalize">
                      {t.category}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 w-5 h-5 text-gold/10" />
                  <p className="text-ivory/70 text-sm leading-relaxed pl-5">
                    {t.text}
                  </p>
                </div>

                <div className="flex items-center gap-0.5 mt-3 pl-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 fill-gold text-gold"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </AppShell>
  );
}
