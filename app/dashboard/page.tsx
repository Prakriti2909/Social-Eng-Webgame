"use client";
import { useAuth } from "@/context/authContext";
import { Shield, BookOpen, Target, Award, TrendingUp, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";

const modules = [
  {
    id: 1,
    title: "What is Phishing?",
    description: "Learn the fundamentals — types, tactics, and how attackers think.",
    level: "Beginner",
    lessons: 4,
    color: "from-green-900/40 to-green-900/10",
    accent: "text-green-400",
    ring: "ring-green-600/20",
    dot: "bg-green-500",
  },
  {
    id: 2,
    title: "Spotting Red Flags",
    description: "Identify spoofed domains, suspicious senders, and lookalike URLs.",
    level: "Intermediate",
    lessons: 6,
    color: "from-yellow-900/40 to-yellow-900/10",
    accent: "text-yellow-400",
    ring: "ring-yellow-600/20",
    dot: "bg-yellow-500",
  },
  {
    id: 3,
    title: "Spear Phishing",
    description: "Advanced targeted attacks with contextual social engineering.",
    level: "Advanced",
    lessons: 5,
    color: "from-red-900/40 to-red-900/10",
    accent: "text-red-400",
    ring: "ring-red-600/20",
    dot: "bg-red-500",
  },
];

const stats = [
  { label: "Modules Completed", value: "0/8", icon: BookOpen },
  { label: "Challenges Done", value: "0", icon: Target },
  { label: "Badges Earned", value: "0", icon: Award },
  { label: "Current Streak", value: "0 days", icon: Zap },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const name = user?.displayName?.split(" ")[0] || "Learner";

  return (
    <div className="min-h-screen bg-black px-6 py-8 pt-16 lg:pt-8">
      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={14} className="text-red-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
              Learner Dashboard
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Welcome back, {name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Continue your social engineering awareness training.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <Icon size={16} className="mb-2 text-red-600" />
              <p className="text-xl font-black text-white">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Continue / Start */}
        <div className="mb-8 rounded-xl border border-red-600/30 bg-red-950/20 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
                Start Here
              </p>
              <h2 className="mt-1 text-lg font-bold text-white">What is Phishing?</h2>
              <p className="mt-0.5 text-sm text-gray-400">
                4 lessons · Beginner · ~20 min
              </p>
            </div>
            <Link
              href="/dashboard/training"
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-700"
            >
              Begin <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Modules */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Training Modules
            </h2>
            <Link
              href="/dashboard/training"
              className="text-xs text-red-500 hover:text-red-400"
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className={`rounded-xl border border-white/10 bg-gradient-to-b ${mod.color} p-4 ring-1 ${mod.ring} backdrop-blur-sm`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className={`flex items-center gap-1.5 text-xs font-semibold ${mod.accent}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${mod.dot}`} />
                    {mod.level}
                  </span>
                  <span className="text-xs text-gray-600">{mod.lessons} lessons</span>
                </div>
                <h3 className="mb-1 font-bold text-white">{mod.title}</h3>
                <p className="text-xs text-gray-500">{mod.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard teaser */}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp size={18} className="text-red-600" />
              <div>
                <p className="text-sm font-bold text-white">Leaderboard</p>
                <p className="text-xs text-gray-500">Complete challenges to earn your rank.</p>
              </div>
            </div>
            <Link
              href="/dashboard/progress"
              className="text-xs text-red-500 hover:text-red-400"
            >
              View →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}