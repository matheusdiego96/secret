"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Check, ChevronLeft, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { getReadChapters, markChapterRead } from "@/lib/storage";
import { manuscriptChapters } from "@/lib/content";

export default function ManuscriptPage() {
  const [readChapters, setReadChapters] = useState<number[]>([]);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);

  useEffect(() => {
    setReadChapters(getReadChapters());
  }, []);

  const handleMarkRead = (id: number) => {
    markChapterRead(id);
    setReadChapters(getReadChapters());
  };

  const chapter = activeChapter
    ? manuscriptChapters.find((c) => c.id === activeChapter)
    : null;

  const progress = Math.round(
    (readChapters.length / manuscriptChapters.length) * 100
  );

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        {!activeChapter ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PageHeader
              title="Sacred Manuscript"
              subtitle="The complete teachings of the Sacred Grotto"
              icon={<BookOpen className="w-6 h-6" />}
            />

            {/* Progress */}
            <Card className="bg-sacred-dark/60 border-gold/10 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground text-xs">
                    Reading Progress
                  </span>
                  <span className="text-gold text-xs font-medium">
                    {readChapters.length}/{manuscriptChapters.length} chapters
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="h-1.5 bg-sacred-gray [&>div]:bg-gold"
                />
              </CardContent>
            </Card>

            {/* Chapter List */}
            <div className="space-y-3">
              {manuscriptChapters.map((ch, i) => {
                const isRead = readChapters.includes(ch.id);
                return (
                  <motion.div
                    key={ch.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card
                      className="bg-sacred-dark/40 border-gold/10 hover:border-gold/20 transition-all duration-300 cursor-pointer group"
                      onClick={() => setActiveChapter(ch.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                            {isRead ? (
                              <Check className="w-4 h-4 text-gold" />
                            ) : (
                              <span className="text-gold text-sm font-heading font-bold">
                                {ch.id}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gold/50 text-[10px] uppercase tracking-widest mb-0.5">
                              {ch.subtitle}
                            </p>
                            <h3 className="text-ivory font-heading font-semibold text-base group-hover:text-gold transition-colors">
                              {ch.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1.5">
                              <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {ch.readTime}
                              </span>
                              {isRead && (
                                <span className="text-gold/60 text-xs">
                                  Completed
                                </span>
                              )}
                            </div>
                          </div>
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
            key="reader"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Back button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveChapter(null)}
              className="text-gold/60 hover:text-gold mb-4 -ml-2"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to chapters
            </Button>

            {/* Chapter header */}
            <div className="mb-8 text-center">
              <p className="text-gold/50 text-xs uppercase tracking-widest mb-2">
                {chapter?.subtitle}
              </p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-ivory mb-2">
                {chapter?.title}
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                <span>{chapter?.readTime}</span>
              </div>
              <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </div>

            {/* Chapter content */}
            <div className="prose-sacred mb-8">
              {chapter?.content.split("\n\n").map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="text-ivory/80 text-[15px] leading-[1.8] mb-5 font-light"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Mark as read */}
            <div className="sticky bottom-20 md:bottom-4 z-10">
              <Card className="bg-sacred-dark/95 backdrop-blur-lg border-gold/10">
                <CardContent className="p-4 flex items-center justify-between">
                  {readChapters.includes(chapter?.id || 0) ? (
                    <div className="flex items-center gap-2 text-gold">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Chapter completed</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      Finished reading?
                    </span>
                  )}
                  <Button
                    onClick={() => handleMarkRead(chapter?.id || 0)}
                    disabled={readChapters.includes(chapter?.id || 0)}
                    className="bg-gold hover:bg-gold-light text-sacred-black text-sm"
                    size="sm"
                  >
                    {readChapters.includes(chapter?.id || 0)
                      ? "Completed"
                      : "Mark as Read"}
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
