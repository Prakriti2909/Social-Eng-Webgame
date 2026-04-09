"use client";
import { useAuth } from "@/context/authContext";
import { Shield, Award, Target, Zap, Star, Lock } from "lucide-react";

const badges = [
  { id: 1, title: "First Login", description: "Joined the platform", icon: Shield, earned: true },
  { id: 2, title: "First Module", description: "Completed your first module", icon: Star, earned: false },
  { id: 3, title: "Phish Spotter", description: "Identified 10 phishing emails", icon: Target, earned: false },
  { id: 4, title: "On a Roll", description: "7 day learning streak", icon: Zap, earned: false },
  { id: 5, title: "Header Hero", description: "Analysed 5 email headers", icon: Award, earned: false },
  { id: 6, title: "Advanced Defender", description: "Completed all advanced modules", icon: Shield, earned: false },
];

const leaderboard = [
  { rank: 1, name: "—", score: 0 },
  { rank: 2, name: "—", score: 0 },
  { rank: 3, name: "—", score: 0 },
];

export default function ProgressPage() {
  const { user } = useAuth();

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
              Progress
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">My Progress</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your badges, scores, and leaderboard ranking.
          </p>
        </div>

        {/* Overall stats */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          {[
            { label: "Total Score", value: "0" },
            { label: "Modules Done", value: "0/8" },
            { label: "Badges", value: "1/6" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-2xl font-black text-white">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="mb-8">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Badges</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl border p-4 text-center transition-all ${
                    badge.earned
                      ? "border-red-600/30 bg-red-950/20 ring-1 ring-red-600/20"
                      : "border-white/10 bg-white/5 opacity-40"
                  }`}
                >
                  <div className="mb-2 flex justify-center">
                    {badge.earned ? (
                      <Icon size={24} className="text-red-400" />
                    ) : (
                      <Lock size={24} className="text-gray-600" />
                    )}
                  </div>
                  <p className="text-sm font-bold text-white">{badge.title}</p>
                  <p className="text-xs text-gray-500">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            Leaderboard
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            {/* Your rank */}
            <div className="flex items-center justify-between border-b border-red-600/20 bg-red-950/20 px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-red-500">YOU</span>
                <span className="text-sm font-semibold text-white">
                  {user?.displayName || "You"}
                </span>
              </div>
              <span className="text-sm font-bold text-white">0 pts</span>
            </div>

            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center justify-between border-b border-white/5 px-5 py-3 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="w-4 text-xs text-gray-600">#{entry.rank}</span>
                  <span className="text-sm text-gray-500">{entry.name}</span>
                </div>
                <span className="text-sm text-gray-600">{entry.score} pts</span>
              </div>
            ))}

            <div className="px-5 py-3 text-center">
              <p className="text-xs text-gray-600">
                Complete modules to appear on the leaderboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}