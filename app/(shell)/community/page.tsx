"use client";
import { useEffect, useState } from "react";
import { getRecentPublicReports, PhishingReport, ReportStatus } from "@/lib/reports";
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, Globe, Loader2, RefreshCw } from "lucide-react";
import { Timestamp } from "firebase/firestore";

function timeAgo(ts: Timestamp | null | undefined): string {
  if (!ts) return "recently";
  const seconds = Math.floor((Date.now() - ts.toDate().getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

const STATUS_CONFIG: Record<ReportStatus, { label: string; textColor: string; borderColor: string; bgColor: string; icon: React.ReactNode }> = {
  under_review: {
    label: "Under Review",
    textColor: "text-yellow-400",
    borderColor: "border-yellow-600/20",
    bgColor: "bg-yellow-950/10",
    icon: <Clock size={12} />,
  },
  confirmed_phishing: {
    label: "Confirmed Phishing",
    textColor: "text-red-400",
    borderColor: "border-red-600/20",
    bgColor: "bg-red-950/10",
    icon: <AlertTriangle size={12} />,
  },
  false_alarm: {
    label: "False Alarm",
    textColor: "text-green-400",
    borderColor: "border-green-600/20",
    bgColor: "bg-green-950/10",
    icon: <CheckCircle size={12} />,
  },
};

function maskSender(sender: string): string {
  // Anonymise sender: show domain, mask local part
  const atIdx = sender.indexOf("@");
  if (atIdx === -1) return "***@unknown";
  const domain = sender.slice(atIdx + 1);
  return `***@${domain}`;
}

function ThreatCard({ report }: { report: PhishingReport }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[report.status];
  const reviewed = report.status !== "under_review";

  return (
    <div className={`rounded-xl border ${cfg.borderColor} ${cfg.bgColor} overflow-hidden transition-all`}>
      {/* Card header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1.5 rounded-full border ${cfg.borderColor} px-2 py-0.5 text-[11px] font-semibold ${cfg.textColor}`}>
                {cfg.icon} {cfg.label}
              </span>
              <span className="text-xs text-gray-600">{timeAgo(report.submittedAt)}</span>
            </div>
            <p className="font-bold text-white text-sm truncate">{report.subject}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-mono">{maskSender(report.sender)}</p>
          </div>
        </div>

        {/* Red flags preview */}
        {reviewed && report.redFlags && report.redFlags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {report.redFlags.slice(0, 3).map((flag, i) => (
              <span key={i} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-gray-400">
                ⚠ {flag}
              </span>
            ))}
            {report.redFlags.length > 3 && (
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-gray-500">
                +{report.redFlags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Expand toggle */}
        {reviewed && (
          <button
            onClick={() => setExpanded(!expanded)}
            className={`mt-3 text-xs font-semibold transition-colors ${cfg.textColor} hover:opacity-80`}
          >
            {expanded ? "Hide analysis ↑" : "See analysis ↓"}
          </button>
        )}
      </div>

      {/* Expanded analysis */}
      {expanded && reviewed && (
        <div className="border-t border-white/10 p-4 flex flex-col gap-3">
          {report.feedbackTitle && (
            <p className="font-bold text-white text-sm">{report.feedbackTitle}</p>
          )}
          {report.feedbackBody && (
            <p className="text-sm text-gray-400">{report.feedbackBody}</p>
          )}
          {report.redFlags && report.redFlags.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Red Flags Identified</p>
              <ul className="flex flex-col gap-1.5">
                {report.redFlags.map((flag, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-red-500">▸</span> {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Anonymised URLs hint */}
          {report.urls && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">URL Patterns</p>
              <p className="text-xs text-gray-600 font-mono">
                {report.urls.split("\n").map(u => {
                  try {
                    const url = new URL(u.trim());
                    return url.hostname;
                  } catch {
                    return u.slice(0, 30) + "...";
                  }
                }).filter(Boolean).join(" · ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CommunityPage() {
  const [reports, setReports] = useState<PhishingReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "confirmed_phishing" | "false_alarm">("all");
  const [refreshing, setRefreshing] = useState(false);

  async function load(refresh = false) {
    if (refresh) setRefreshing(true); else setLoading(true);
    try {
      const data = await getRecentPublicReports(50);
      setReports(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = filter === "all" ? reports : reports.filter((r) => r.status === filter);
  const phishingCount = reports.filter((r) => r.status === "confirmed_phishing").length;
  const falseAlarmCount = reports.filter((r) => r.status === "false_alarm").length;

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

      <div className="relative max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Globe size={14} className="text-red-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
              Community Intelligence
            </span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white">Threat Feed</h1>
              <p className="mt-1 text-sm text-gray-500">
                Anonymised phishing reports from the community. Real threats, real patterns.
              </p>
            </div>
            <button
              onClick={() => load(true)}
              disabled={refreshing}
              className="mt-1 flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition-all hover:border-white/20 hover:text-white disabled:opacity-50"
            >
              <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats banner */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
            <p className="text-xl font-black text-white">{reports.length}</p>
            <p className="text-xs text-gray-500">Total Reports</p>
          </div>
          <div className="rounded-xl border border-red-600/20 bg-red-950/10 p-3 text-center">
            <p className="text-xl font-black text-red-400">{phishingCount}</p>
            <p className="text-xs text-gray-500">Confirmed Phishing</p>
          </div>
          <div className="rounded-xl border border-green-600/20 bg-green-950/10 p-3 text-center">
            <p className="text-xl font-black text-green-400">{falseAlarmCount}</p>
            <p className="text-xs text-gray-500">False Alarms</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-5 flex gap-2">
          {([["all", "All"], ["confirmed_phishing", "Phishing"], ["false_alarm", "False Alarms"]] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                filter === val
                  ? "border-red-600/40 bg-red-950/20 text-red-400"
                  : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={24} className="animate-spin text-gray-600" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
              <Globe size={28} className="text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No reports yet. Be the first to submit one.</p>
            </div>
          ) : (
            filtered.map((r) => <ThreatCard key={r.id} report={r} />)
          )}
        </div>

        {/* Privacy note */}
        <p className="mt-8 text-center text-xs text-gray-700">
          All reports are anonymised. Sender details are partially masked and no personal information is shared.
        </p>
      </div>
    </div>
  );
}