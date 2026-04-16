"use client";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { submitReport } from "@/lib/reports";
import {
  Shield,
  Mail,
  Link2,
  FileText,
  User,
  CheckCircle,
  AlertTriangle,
  Copy,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

type Step = "form" | "success";

export default function ReportPage() {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("form");
  const [caseId, setCaseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [urls, setUrls] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setError("");
    setLoading(true);
    try {
      const id = await submitReport({
        userId: user.uid,
        userDisplayName: user.displayName || "Anonymous",
        sender,
        subject,
        body,
        urls,
      });
      setCaseId(id);
      setStep("success");
    } catch (err) {
      setError("Failed to submit report. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function copyCase() {
    navigator.clipboard.writeText(caseId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

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

      <div className="relative max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} className="text-red-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
              Threat Reporting
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Report Suspicious Email
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Submit a suspicious email for analysis. You'll receive feedback on whether it was phishing and what gave it away.
          </p>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Sender */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                <User size={12} /> Sender Address
              </label>
              <input
                type="text"
                required
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g. security@paypa1.com"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                <Mail size={12} /> Email Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. URGENT: Your account has been compromised"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
              />
            </div>

            {/* Body */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                <FileText size={12} /> Email Body
              </label>
              <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Paste the full email content here..."
                rows={7}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30 resize-none"
              />
            </div>

            {/* URLs */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                <Link2 size={12} /> Suspicious URLs
                <span className="ml-1 text-gray-600 normal-case font-normal">(optional)</span>
              </label>
              <textarea
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                placeholder="Paste any URLs found in the email, one per line..."
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30 resize-none font-mono"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Info box */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-400">What happens next?</span> Our team reviews your report and assigns a verdict. You'll get a detailed breakdown of what red flags were present (or not). Your submission contributes to the community threat feed.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-8 py-3 text-base font-bold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Report"}
              {!loading && <ChevronRight size={16} />}
            </button>
          </form>
        ) : (
          /* Success state */
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-green-600/30 bg-green-950/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle size={24} className="text-green-500" />
                <div>
                  <p className="font-bold text-white">Report Submitted</p>
                  <p className="text-sm text-gray-400">Your case is now under review.</p>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Case ID</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black tracking-widest text-red-400">{caseId}</span>
                  <button
                    onClick={copyCase}
                    className="flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-gray-400 transition-all hover:border-white/20 hover:text-white"
                  >
                    <Copy size={12} />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-600">Save this ID to track your report and see feedback.</p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-bold text-white mb-1">What's next?</p>
              <ul className="flex flex-col gap-2 mt-3">
                {[
                  "A reviewer will analyse the email content and URLs.",
                  "You'll receive a verdict: Confirmed Phishing or False Alarm.",
                  "Detailed feedback will explain exactly what red flags (if any) were present.",
                  "Anonymised data from your report may appear in the community feed.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-red-600/40 text-[10px] font-bold text-red-500">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setStep("form");
                  setSender(""); setSubject(""); setBody(""); setUrls("");
                }}
                className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-gray-400 transition-all hover:border-white/20 hover:text-white"
              >
                Submit Another
              </button>
              <Link
                href="/community"
                className="rounded-lg border border-red-600/40 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all hover:border-red-600/60 hover:text-red-300"
              >
                View Community Feed →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}