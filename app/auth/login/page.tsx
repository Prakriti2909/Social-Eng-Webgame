"use client";
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { auth } from "@/lib/firebase";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // TODO: replace with your actual API call
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await res.json();
    // if (!res.ok) { setError(data.error); setLoading(false); return; }
    // router.push("/dashboard");

    setTimeout(() => {
      setLoading(false);
      setError("API not connected yet — placeholder");
    }, 1000);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4">

      {/* Grid overlay — matches hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow — matches hero */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-red-900/20 blur-[120px]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">

        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <Shield
            className="text-red-600 drop-shadow-[0_0_18px_rgba(220,38,38,0.7)]"
            size={48}
            strokeWidth={1.5}
          />
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-widest text-white uppercase">
              SocEng
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Sign in to your account
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 rounded-md border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Email
            </label>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-md border border-white/10 bg-white/5 py-3 pl-9 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Password
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-white/10 bg-white/5 py-3 pl-9 pr-10 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              href="#"
              className="text-xs text-gray-500 transition-colors hover:text-red-400"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-md bg-red-600 px-8 py-3 text-base font-bold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-gray-600">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-red-500 transition-colors hover:text-red-400"
          >
            Create one
          </Link>
        </p>

        {/* Attacker interface link — placeholder space */}
        {/* TODO: uncomment when attacker side is ready */}
        {/* <div className="mt-4 text-center">
          <Link
            href="/attacker"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Attacker interface →
          </Link>
        </div> */}
      </div>

      {/* Back to home */}
      <Link
        href="/"
        className="relative mt-6 text-xs text-gray-600 transition-colors hover:text-gray-400"
      >
        ← Back to home
      </Link>
    </main>
  );
}