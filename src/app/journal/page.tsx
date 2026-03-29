"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Plus, Trash2, Calendar, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import {
  getJournalEntries,
  saveJournalEntry,
  deleteJournalEntry,
  type JournalEntry,
} from "@/lib/storage";

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setEntries(getJournalEntries());
  }, []);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    saveJournalEntry({
      title: title.trim(),
      content: content.trim(),
      date: new Date().toISOString(),
    });
    setEntries(getJournalEntries());
    setTitle("");
    setContent("");
    setIsWriting(false);
  };

  const handleDelete = (id: string) => {
    deleteJournalEntry(id);
    setEntries(getJournalEntries());
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AppShell>
      <PageHeader
        title="Spiritual Journal"
        subtitle="Record your reflections, insights, and sacred moments"
        icon={<PenLine className="w-6 h-6" />}
      />

      {/* New Entry Button / Form */}
      <AnimatePresence mode="wait">
        {!isWriting ? (
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-6"
          >
            <Button
              onClick={() => setIsWriting(true)}
              className="w-full h-12 bg-gold/10 border border-gold/20 text-gold hover:bg-gold/15 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Journal Entry
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6"
          >
            <Card className="bg-sacred-dark/60 border-gold/10">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-gold text-xs uppercase tracking-widest font-medium">
                    New Entry
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsWriting(false);
                      setTitle("");
                      setContent("");
                    }}
                    className="text-muted-foreground hover:text-ivory h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Title your reflection..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-sacred-gray/50 border-gold/10 text-ivory placeholder:text-muted-foreground/40 focus:border-gold/30"
                />
                <Textarea
                  placeholder="Write your thoughts, prayers, and insights..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="bg-sacred-gray/50 border-gold/10 text-ivory placeholder:text-muted-foreground/40 focus:border-gold/30 resize-none"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsWriting(false);
                      setTitle("");
                      setContent("");
                    }}
                    className="text-muted-foreground"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!title.trim() || !content.trim()}
                    className="bg-gold hover:bg-gold-light text-sacred-black"
                  >
                    Save Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries */}
      {entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-sacred-dark/30 border-gold/5">
            <CardContent className="p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center mx-auto mb-4">
                <PenLine className="w-7 h-7 text-gold/30" />
              </div>
              <h3 className="text-ivory/60 font-heading text-lg mb-1">
                Your journal is empty
              </h3>
              <p className="text-muted-foreground/50 text-sm max-w-xs mx-auto">
                Begin recording your sacred journey. Every reflection deepens
                your connection to the divine.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="bg-sacred-dark/40 border-gold/5 hover:border-gold/15 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-ivory font-heading font-semibold text-base">
                        {entry.title}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground/50 text-xs mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(entry.date)}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      className="text-muted-foreground/30 hover:text-destructive h-8 w-8 p-0 flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <p className="text-ivory/60 text-sm leading-relaxed line-clamp-4">
                    {entry.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
