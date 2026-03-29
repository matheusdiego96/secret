"use client";

export const STORAGE_KEYS = {
  EMAIL: "sg_email",
  JOURNEY_PROGRESS: "sg_journey_progress",
  MANUSCRIPT_PROGRESS: "sg_manuscript_progress",
  RITUAL_COMPLETIONS: "sg_ritual_completions",
  PRAYER_SESSIONS: "sg_prayer_sessions",
  JOURNAL_ENTRIES: "sg_journal_entries",
  STREAK: "sg_streak",
  LAST_ACTIVE: "sg_last_active",
} as const;

export function getEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.EMAIL);
}

export function setEmail(email: string): void {
  localStorage.setItem(STORAGE_KEYS.EMAIL, email);
}

export function clearSession(): void {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
}

export function getCompletedDays(): number[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.JOURNEY_PROGRESS);
  return data ? JSON.parse(data) : [];
}

export function completeDay(day: number): void {
  const days = getCompletedDays();
  if (!days.includes(day)) {
    days.push(day);
    localStorage.setItem(STORAGE_KEYS.JOURNEY_PROGRESS, JSON.stringify(days));
  }
}

export function getReadChapters(): number[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.MANUSCRIPT_PROGRESS);
  return data ? JSON.parse(data) : [];
}

export function markChapterRead(id: number): void {
  const chapters = getReadChapters();
  if (!chapters.includes(id)) {
    chapters.push(id);
    localStorage.setItem(
      STORAGE_KEYS.MANUSCRIPT_PROGRESS,
      JSON.stringify(chapters)
    );
  }
}

export function getRitualCompletions(): string[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.RITUAL_COMPLETIONS);
  return data ? JSON.parse(data) : [];
}

export function completeRitual(): void {
  const completions = getRitualCompletions();
  const today = new Date().toISOString().split("T")[0];
  if (!completions.includes(today)) {
    completions.push(today);
    localStorage.setItem(
      STORAGE_KEYS.RITUAL_COMPLETIONS,
      JSON.stringify(completions)
    );
  }
}

export function getPrayerSessions(): number {
  if (typeof window === "undefined") return 0;
  const data = localStorage.getItem(STORAGE_KEYS.PRAYER_SESSIONS);
  return data ? parseInt(data, 10) : 0;
}

export function addPrayerSession(): void {
  const count = getPrayerSessions();
  localStorage.setItem(STORAGE_KEYS.PRAYER_SESSIONS, String(count + 1));
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
}

export function getJournalEntries(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
  return data ? JSON.parse(data) : [];
}

export function saveJournalEntry(entry: Omit<JournalEntry, "id">): void {
  const entries = getJournalEntries();
  entries.unshift({ ...entry, id: crypto.randomUUID() });
  localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
}

export function deleteJournalEntry(id: string): void {
  const entries = getJournalEntries().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
}

export function getStreak(): number {
  if (typeof window === "undefined") return 0;
  const last = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE);
  const today = new Date().toISOString().split("T")[0];
  if (!last) return 0;
  const streak = parseInt(
    localStorage.getItem(STORAGE_KEYS.STREAK) || "0",
    10
  );
  const lastDate = new Date(last);
  const todayDate = new Date(today);
  const diffDays = Math.floor(
    (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays <= 1) return streak;
  return 0;
}

export function updateStreak(): void {
  const today = new Date().toISOString().split("T")[0];
  const last = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE);
  if (last === today) return;
  const lastDate = last ? new Date(last) : null;
  const todayDate = new Date(today);
  const diffDays = lastDate
    ? Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    : 2;
  const currentStreak = parseInt(
    localStorage.getItem(STORAGE_KEYS.STREAK) || "0",
    10
  );
  const newStreak = diffDays === 1 ? currentStreak + 1 : 1;
  localStorage.setItem(STORAGE_KEYS.STREAK, String(newStreak));
  localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, today);
}
