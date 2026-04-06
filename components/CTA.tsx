"use client";

export default function CTA() {
  return (
    <section className="relative bg-black px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Card with dark teal gradient background */}
        <div
          className="relative overflow-hidden rounded-2xl px-10 py-16 text-center"
          style={{
            background:
              "linear-gradient(135deg, #0a1f1a 0%, #0d2233 50%, #071a2e 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Subtle dot grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Glow blobs */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-green-900/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-teal-900/20 blur-3xl" />

          {/* Content */}
          <div className="relative">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Knowledge is Your Best Defense
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-400 md:text-lg">
              Understanding social engineering tactics empowers you to recognize
              and prevent attacks before they succeed.
            </p>
            <button className="mt-8 rounded-lg bg-green-500 px-10 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-green-400 hover:shadow-[0_0_24px_rgba(34,197,94,0.4)] active:scale-95">
              Start Learning Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}