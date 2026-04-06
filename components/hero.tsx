"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawGrid = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      const size = 60;
      for (let x = 0; x <= canvas.width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    drawGrid();
    window.addEventListener("resize", drawGrid);
    return () => window.removeEventListener("resize", drawGrid);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Grid canvas overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Red radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(200,0,0,0.13)_0%,transparent_70%)]" />
      </div>

      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 text-center px-4"
        style={{ animation: "fadeUp 0.85s ease both" }}
      >
        {/* Shield Icon */}
        <div className="mb-2">
          <svg
            width="88"
            height="98"
            viewBox="0 0 88 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Back shield (rotated dark) */}
            <path
              d="M44 4 L74 17 L74 49 C74 67 61 81 44 89 C27 81 14 67 14 49 L14 17 Z"
              fill="#180000"
              stroke="#7a0000"
              strokeWidth="2"
              transform="rotate(-14, 44, 49) translate(-3, 3)"
            />
            {/* Front shield */}
            <path
              d="M44 4 L74 17 L74 49 C74 67 61 81 44 89 C27 81 14 67 14 49 L14 17 Z"
              fill="#120000"
              stroke="#e00000"
              strokeWidth="2.5"
            />
            {/* Clock circle */}
            <circle cx="44" cy="47" r="15" fill="#0a0a0a" stroke="#e00000" strokeWidth="1.5" />
            {/* Clock hour hand */}
            <line x1="44" y1="47" x2="37" y2="39" stroke="#cc0000" strokeWidth="2" strokeLinecap="round" />
            {/* Clock minute hand */}
            <line x1="44" y1="47" x2="54" y2="50" stroke="#cc0000" strokeWidth="2" strokeLinecap="round" />
            {/* Center dot */}
            <circle cx="44" cy="47" r="1.5" fill="#e00000" />
          </svg>
        </div>

        {/* Main Headline */}
        <div className="leading-none -mt-2">
          <h1
            className="text-[clamp(4.5rem,13vw,9.5rem)] font-black uppercase text-white tracking-tight leading-none"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            SOCIAL
          </h1>
          <h1
            className="text-[clamp(4.5rem,13vw,9.5rem)] font-black uppercase text-[#e00000] tracking-tight leading-none"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            ENGINEERING
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-1 font-normal">
          Understanding the art of human manipulation in cybersecurity
        </p>

        {/* Scroll Mouse Indicator */}
        <div className="flex flex-col items-center mt-1">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div
              className="w-1 h-2 bg-gray-400 rounded-full"
              style={{ animation: "scrollDot 1.4s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center mt-1">
          <button className="px-9 py-4 bg-[#e00000] hover:bg-[#c00000] active:scale-95 text-white font-bold text-base rounded-lg transition-all duration-200 cursor-pointer">
            Learn More
          </button>
          <button className="px-9 py-4 bg-[#1c1c1c] hover:bg-[#262626] active:scale-95 text-white font-bold text-base rounded-lg border border-[#3a3a3a] transition-all duration-200 cursor-pointer">
            Test Your Knowledge
          </button>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(6px); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}