"use client";
import React from "react"
import { Shield, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Password strength checker
  function getStrength(pwd: string): { label: string; color: string; width: string } {
    if (pwd.length === 0) return { label: "", color: "", width: "0%" };
    if (pwd.length < 6) return { label: "Too short", color: "bg-red-600", width: "25%" };
    if (pwd.length < 8) return { label: "Weak", color: "bg-orange-500", width: "50%" };
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd))
      return { label: "Fair", color: "bg-yellow-500", width: "65%" };
    if (!/[^A-Za-z0-9]/.test(pwd))
      return { label: "Good", color: "bg-blue-500", width: "80%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  }

  const strength = getStrength(password);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    // TODO: replace with your actual API call
    // const res = await fetch("/api/auth/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, email, password }),
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
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 py-12">

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
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
              Create your account
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Username
            </label>
            <div className="relative">
              <User
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="yourname"
                className="w-full rounded-md border border-white/10 bg-white/5 py-3 pl-9 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
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

            {/* Password strength bar */}
            {password.length > 0 && (
              <div className="mt-1.5 flex flex-col gap-1">
                <div className="h-1 w-full rounded-full bg-white/10">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
                <span className="text-xs text-gray-500">{strength.label}</span>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className={`w-full rounded-md border bg-white/5 py-3 pl-9 pr-10 text-sm text-white placeholder-gray-600 outline-none transition-all focus:ring-1 ${
                  confirm.length > 0 && confirm !== password
                    ? "border-red-600/60 focus:border-red-600 focus:ring-red-600/30"
                    : confirm.length > 0 && confirm === password
                    ? "border-green-600/60 focus:border-green-600 focus:ring-green-600/30"
                    : "border-white/10 focus:border-red-600/60 focus:ring-red-600/30"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {/* Match indicator */}
            {confirm.length > 0 && (
              <span className={`text-xs ${confirm === password ? "text-green-500" : "text-red-500"}`}>
                {confirm === password ? "Passwords match" : "Passwords do not match"}
              </span>
            )}
          </div>

          {/* Role selector — learner default, attacker placeholder */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="rounded-md border border-red-600/60 bg-red-600/10 py-2.5 text-sm font-semibold text-red-400 ring-1 ring-red-600/30"
              >
                Learner
              </button>
              {/* Attacker role — locked until prof authorization */}
              <button
                type="button"
                disabled
                title="Requires faculty authorization"
                className="rounded-md border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-gray-600 cursor-not-allowed"
              >
                Attacker ↗
              </button>
            </div>
            <p className="text-xs text-gray-600">
              Attacker interface requires faculty authorization.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-md bg-red-600 px-8 py-3 text-base font-bold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-gray-600">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-red-500 transition-colors hover:text-red-400"
          >
            Sign in
          </Link>
        </p>
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