"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Droplets, ArrowRight, Shield, Sparkles, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getEmail, setEmail } from "@/lib/storage";

export default function EntryPage() {
  const router = useRouter();
  const [email, setEmailValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getEmail()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setEmail(email.trim());
    setTimeout(() => router.push("/dashboard"), 500);
  };

  return (
    <div className="min-h-screen bg-sacred-black bg-parchment-texture flex flex-col relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[100px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center glow-gold-strong">
            <Droplets className="w-10 h-10 md:w-12 md:h-12 text-gold" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-10 max-w-lg"
        >
          <p className="text-gold/60 text-xs md:text-sm uppercase tracking-[0.3em] mb-3">
            Premium Members Area
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ivory leading-tight mb-4">
            Sacred Grotto
            <span className="block text-gradient-gold">Manuscript</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm mx-auto">
            Enter the sacred experience. Your transformative journey of healing,
            purpose, and divine connection awaits within.
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-sm space-y-4"
        >
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmailValue(e.target.value)}
              required
              className="h-12 bg-sacred-dark/80 border-gold/20 text-ivory placeholder:text-muted-foreground/50 text-center text-base focus:border-gold/50 focus:ring-gold/20"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gold hover:bg-gold-light text-sacred-black font-semibold text-base transition-all duration-300 glow-gold"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-sacred-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Enter the Sacred Experience
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground/60 pt-1">
            Instant access — no password required
          </p>
        </motion.form>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          {[
            { icon: BookOpen, label: "Sacred Manuscript" },
            { icon: Sparkles, label: "7-Day Journey" },
            { icon: Shield, label: "Premium Access" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-muted-foreground/50 text-xs"
            >
              <item.icon className="w-3.5 h-3.5 text-gold/40" />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div className="w-full px-8 pb-6 relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <p className="text-center text-[10px] text-muted-foreground/30 mt-3 uppercase tracking-widest">
          A Sacred Digital Experience
        </p>
      </div>
    </div>
  );
}
