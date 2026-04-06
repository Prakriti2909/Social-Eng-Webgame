
"use client";

import { Shield } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow behind content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-red-900/20 blur-[120px]" />
      </div>

      {/* Shield Icon */}
      <div className="relative mb-6 flex items-center justify-center">
        <Shield
          className="text-red-600 drop-shadow-[0_0_18px_rgba(220,38,38,0.7)]"
          size={90}
          strokeWidth={1.5}
        />
        {/* orbit ring */}
        <div
          className="absolute h-[120px] w-[120px] rounded-full border border-red-700/50"
          style={{ transform: "rotateX(65deg)" }}
        />
      </div>

      {/* Heading */}
      <h1 className="relative mb-4 leading-none tracking-tight">
        <span className="block text-6xl font-black text-white md:text-8xl">
          SOCIAL
        </span>
        <span className="block text-6xl font-black text-red-500 md:text-8xl">
          ENGINEERING
        </span>
      </h1>

      {/* Subheading */}
      <p className="relative mb-10 text-lg text-gray-400 md:text-xl">
        Understanding the art of human manipulation in cybersecurity
      </p>

      {/* Buttons */}
      <div className="relative flex flex-col gap-4 sm:flex-row">
        <button className="rounded-md bg-red-600 px-8 py-3 text-base font-bold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] active:scale-95">
          <Link href="/auth/login">Learn More</Link>
        </button>
        <button className="rounded-md border border-gray-600 bg-transparent px-8 py-3 text-base font-bold text-white transition-all duration-200 hover:border-gray-400 hover:bg-white/5 active:scale-95">
          Test Your Knowledge
        </button>
      </div>
    </section>
  );
}