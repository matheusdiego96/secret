"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function PageHeader({ title, subtitle, icon }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
            {icon}
          </div>
        </div>
      )}
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-ivory mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </motion.div>
  );
}
