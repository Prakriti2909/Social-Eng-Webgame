"use client";
import { BookOpen, Lock, CheckCircle, ChevronRight, Shield } from "lucide-react";

const tracks = [
  {
    level: "Beginner",
    color: "text-green-400",
    dot: "bg-green-500",
    ring: "ring-green-600/20",
    border: "border-green-600/20",
    modules: [
      { id: 1, title: "What is Phishing?", lessons: 4, duration: "20 min", unlocked: true, done: false },
      { id: 2, title: "Types of Phishing Attacks", lessons: 5, duration: "25 min", unlocked: false, done: false },
      { id: 3, title: "Red Flags Checklist", lessons: 3, duration: "15 min", unlocked: false, done: false },
    ],
  },
  {
    level: "Intermediate",
    color: "text-yellow-400",
    dot: "bg-yellow-500",
    ring: "ring-yellow-600/20",
    border: "border-yellow-600/20",
    modules: [
      { id: 4, title: "Spoofed Domains & Lookalike URLs", lessons: 6, duration: "30 min", unlocked: false, done: false },
      { id: 5, title: "Email Header Analysis", lessons: 5, duration: "35 min", unlocked: false, done: false },
      { id: 6, title: "Reporting Phishing Attempts", lessons: 4, duration: "20 min", unlocked: false, done: false },
    ],
  },
  {
    level: "Advanced",
    color: "text-red-400",
    dot: "bg-red-500",
    ring: "ring-red-600/20",
    border: "border-red-600/20",
    modules: [
      { id: 7, title: "Spear Phishing Deep Dive", lessons: 5, duration: "40 min", unlocked: false, done: false },
      { id: 8, title: "Real Campaign Analysis", lessons: 6, duration: "45 min", unlocked: false, done: false },
    ],
  },
];

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-black px-6 py-8 pt-16 lg:pt-8">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={14} className="text-red-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
              Training
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Modules</h1>
          <p className="mt-1 text-sm text-gray-500">
            Complete beginner modules to unlock intermediate and advanced tracks.
          </p>
        </div>

        {/* Tracks */}
        <div className="flex flex-col gap-8">
          {tracks.map((track) => (
            <div key={track.level}>
              {/* Track header */}
              <div className={`mb-3 flex items-center gap-2 ${track.color}`}>
                <span className={`h-2 w-2 rounded-full ${track.dot}`} />
                <span className="text-xs font-bold uppercase tracking-widest">{track.level}</span>
              </div>

              {/* Modules */}
              <div className="flex flex-col gap-2">
                {track.modules.map((mod) => (
                  <div
                    key={mod.id}
                    className={`flex items-center justify-between rounded-xl border bg-white/5 px-5 py-4 ring-1 ${track.ring} ${track.border} ${
                      !mod.unlocked ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                        {mod.done ? (
                          <CheckCircle size={18} className="text-green-400" />
                        ) : mod.unlocked ? (
                          <BookOpen size={18} className="text-gray-400" />
                        ) : (
                          <Lock size={18} className="text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{mod.title}</p>
                        <p className="text-xs text-gray-500">
                          {mod.lessons} lessons · {mod.duration}
                        </p>
                      </div>
                    </div>

                    {mod.unlocked && (
                      <button className="flex items-center gap-1.5 rounded-lg bg-red-600/10 px-3 py-1.5 text-xs font-semibold text-red-400 ring-1 ring-red-600/20 transition-all hover:bg-red-600/20">
                        Start <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}