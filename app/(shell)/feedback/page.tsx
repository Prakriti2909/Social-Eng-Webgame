"use client";
import { useState } from "react";
import { getReportsByCaseId, PhishingReport } from "@/lib/reports";
import {
  Shield,
  Search,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";

function formatDate(ts: Timestamp | null | undefined): string {
  if (!ts) return "—";
  return ts.toDate().toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function FeedbackResult({ report }: { report: PhishingReport }) {
  const isPhishing = report.status === "confirmed_phishing";
  const isFalse = report.status === "false_alarm";
  const isPending = report.status === "under_review";

  return (
    <div className="flex flex-col gap-5">
      {/* Case header */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Case ID</p>
          <span className="font-mono text-sm font-black text-red-400">{report.caseId}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-600 mb-0.5">Subject</p>
            <p className="text-white font-medium">{report.subject}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-0.5">Submitted</p>
            <p className="text-gray-300">{formatDate(report.submittedAt)}</p>
          </div>
        </div>
      </div>

      {/* Verdict */}
      {isPending ? (
        <div className="rounded-xl border border-yellow-600/30 bg-yellow-950/20 p-5">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-yellow-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Under Review</p>
              <p className="text-sm text-gray-400 mt-0.5">
                Your report is in the queue. Our team will analyse it and post feedback shortly. Check back later.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Verdict banner */}
          <div className={`rounded-xl border p-5 ${
            isPhishing
              ? "border-red-600/40 bg-red-950/20"
              : "border-green-600/40 bg-green-950/20"
          }`}>
            <div className="flex items-center gap-3 mb-3">
              {isPhishing
                ? <AlertTriangle size={24} className="text-red-400 shrink-0" />
                : <CheckCircle size={24} className="text-green-400 shrink-0" />
              }
              <div>
                <p className={`font-black text-lg ${isPhishing ? "text-red-400" : "text-green-400"}`}>
                  {isPhishing ? "Confirmed Phishing" : "False Alarm"}
                </p>
                {report.feedbackTitle && (
                  <p className="text-white font-medium text-sm mt-0.5">{report.feedbackTitle}</p>
                )}
              </div>
            </div>

            {report.feedbackBody && (
              <p className="text-sm text-gray-300 leading-relaxed">{report.feedbackBody}</p>
            )}

            {report.reviewedAt && (
              <p className="mt-3 text-xs text-gray-600">Reviewed {formatDate(report.reviewedAt)}</p>
            )}
          </div>

          {/* Red flags */}
          {report.redFlags && report.redFlags.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                {isPhishing ? "Red Flags Identified" : "What We Checked"}
              </p>
              <ul className="flex flex-col gap-2.5">
                {report.redFlags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      isPhishing ? "bg-red-950 text-red-400 border border-red-600/40" : "bg-green-950 text-green-400 border border-green-600/40"
                    }`}>
                      {isPhishing ? "!" : "✓"}
                    </span>
                    <span className="text-sm text-gray-300">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Learning nudge */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold text-white mb-1">Keep Learning</p>
            <p className="text-xs text-gray-500 mb-3">
              {isPhishing
                ? "Understanding attacker techniques makes you harder to fool. Continue your training to spot these patterns faster."
                : "Even careful reports help sharpen your eye. Training will help you build stronger instincts."
              }
            </p>
            <Link
              href="/dashboard/training"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300"
            >
              Continue Training <ChevronRight size={12} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function FeedbackPage() {
  const [caseId, setCaseId] = useState("");
  const [report, setReport] = useState<PhishingReport | null | "not_found">(null);
  const [loading, setLoading] = useState(false);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    if (!caseId.trim()) return;
    setLoading(true);
    setReport(null);
    try {
      const result = await getReportsByCaseId(caseId.trim().toUpperCase());
      setReport(result ?? "not_found");
    } finally {
      setLoading(false);
    }
  }

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

      <div className="relative max-w-xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={14} className="text-red-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
              Report Feedback
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Track Your Case</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter your Case ID to see the verdict and learn what the red flags were.
          </p>
        </div>

        {/* Lookup form */}
        <form onSubmit={lookup} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={caseId}
              onChange={(e) => setCaseId(e.target.value.toUpperCase())}
              placeholder="PHX-XXXXXX"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-9 pr-4 font-mono text-sm text-white placeholder-gray-600 outline-none uppercase tracking-widest focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !caseId.trim()}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <ChevronRight size={14} />}
            {loading ? "" : "Look up"}
          </button>
        </form>

        {/* Results */}
        {report === "not_found" && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-white font-bold mb-1">Case not found</p>
            <p className="text-sm text-gray-500">Double-check your Case ID. It should look like <span className="font-mono text-gray-400">PHX-ABC123</span>.</p>
          </div>
        )}

        {report && report !== "not_found" && <FeedbackResult report={report} />}

        {/* Prompt to submit */}
        {!report && !loading && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 mt-4">
            <p className="text-sm font-bold text-white mb-1">Haven't reported anything yet?</p>
            <p className="text-xs text-gray-500 mb-3">Submit a suspicious email you've received and get expert feedback on whether it was phishing.</p>
            <Link
              href="/report"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300"
            >
              Submit a report <ChevronRight size={12} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}