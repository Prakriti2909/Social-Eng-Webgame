"use client";

import { ShieldCheck, Eye, Lock, Brain, BookOpen, RefreshCw } from "lucide-react";
import { useState } from "react";

const protections = [
  {
    icon: ShieldCheck,
    title: "Verify Identity",
    description:
      "Always verify the identity of people requesting sensitive information through independent channels.",
  },
  {
    icon: Eye,
    title: "Stay Vigilant",
    description:
      "Be suspicious of unsolicited requests, especially those creating urgency or fear.",
  },
  {
    icon: Lock,
    title: "Use MFA",
    description:
      "Enable multi-factor authentication on all accounts to add an extra layer of security.",
  },
  {
    icon: Brain,
    title: "Think Before Acting",
    description:
      "Take time to evaluate requests. Attackers rely on rushed decisions.",
  },
  {
    icon: BookOpen,
    title: "Education",
    description:
      "Regular security awareness training helps recognize and prevent attacks.",
  },
  {
    icon: RefreshCw,
    title: "Update Regularly",
    description:
      "Keep software and systems updated to protect against known vulnerabilities.",
  },
];

export default function Protection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative bg-black px-6 py-20">
      {/* Top separator */}
      <div className="mx-auto mb-14 max-w-6xl border-t border-white/5" />

      {/* Header */}
      <div className="mb-14 text-center">
        <h2 className="text-5xl font-black tracking-tight md:text-6xl">
          <span className="text-white">STAY </span>
          <span className="text-green-400">PROTECTED</span>
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Essential strategies to defend against social engineering attacks
        </p>
      </div>

      {/* Cards Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {protections.map((item, index) => {
          const Icon = item.icon;
          const isHovered = hovered === index;

          return (
            <div
              key={item.title}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative flex items-start gap-5 rounded-2xl border p-6 transition-all duration-300 cursor-default
                ${
                  isHovered
                    ? "border-green-700/50 bg-[#0d1a12] shadow-[0_0_28px_rgba(34,197,94,0.1)]"
                    : "border-white/5 bg-[#141414] hover:border-white/10"
                }`}
            >
              {/* Glow blob on hover */}
              {isHovered && (
                <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-green-900/25 blur-3xl" />
              )}

              {/* Icon box */}
              <div
                className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300
                  ${isHovered ? "bg-green-900/40" : "bg-[#1a1f1a]"}`}
              >
                <Icon
                  size={22}
                  className={`transition-colors duration-300 ${
                    isHovered ? "text-green-300" : "text-green-500"
                  }`}
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}