"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import {
  getAllReports,
  updateReportStatus,
  PhishingReport,
  ReportStatus,
} from "@/lib/reports";
import {
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  Search,
} from "lucide-react";
import { Timestamp } from "firebase/firestore";

const ADMIN_UIDS = ["Aa3S9XFAFSOoRDBRPUpOIbwbbdh2"];

function formatDate(ts: Timestamp | null | undefined): string {
  if (!ts) return "—";
  return ts.toDate().toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

const STATUS_CONFIG: Record<ReportStatus, { label: string; color: string; icon: React.ReactNode }> = {
  under_review: {
    label: "Under Review",
    color: "text-yellow-400 border-yellow-600/30 bg-yellow-950/20",
    icon: <Clock size={12} />,
  },
  confirmed_phishing: {
    label: "Confirmed Phishing",
    color: "text-red-400 border-red-600/30 bg-red-950/20",
    icon: <CheckCircle size={12} />,
  },
  false_alarm: {
    label: "False Alarm",
    color: "text-green-400 border-green-600/30 bg-green-950/20",
    icon: <XCircle size={12} />,
  },
};

function StatusBadge({ status }: { status: ReportStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${cfg.color}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
}

function ReportRow({ report, onUpdated }: { report: PhishingReport; onUpdated: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState(report.feedbackTitle ?? "");
  const [feedbackBody, setFeedbackBody] = useState(report.feedbackBody ?? "");
  const [redFlagsRaw, setRedFlagsRaw] = useState((report.redFlags ?? []).join("\n"));
  const [newStatus, setNewStatus] = useState<ReportStatus>(report.status);

  async function save() {
    if (!report.id) return;
    setSaving(true);
    try {
      await updateReportStatus(report.id, newStatus, {
        feedbackTitle,
        feedbackBody,
        redFlags: redFlagsRaw.split("\n").map((s) => s.trim()).filter(Boolean),
      });
      onUpdated();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      {/* Row header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/[0.03]"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className="font-mono text-xs font-bold text-red-500 shrink-0">{report.caseId}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{report.subject}</p>
            <p className="text-xs text-gray-500 truncate">{report.sender}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-3">
          <StatusBadge status={report.status} />
          <span className="text-xs text-gray-600 hidden sm:block">{formatDate(report.submittedAt)}</span>
          {expanded ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
        </div>
      </button>

      {/* Expanded panel */}
      {expanded && (
        <div className="border-t border-white/10 p-4 flex flex-col gap-5">
          {/* Report content */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Submitted By</p>
              <p className="text-sm text-gray-300">{report.userDisplayName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Submitted</p>
              <p className="text-sm text-gray-300">{formatDate(report.submittedAt)}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Email Body</p>
              <pre className="whitespace-pre-wrap rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-gray-400 font-mono max-h-48 overflow-y-auto">
                {report.body}
              </pre>
            </div>
            {report.urls && (
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">URLs</p>
                <pre className="whitespace-pre-wrap rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-red-400 font-mono">
                  {report.urls}
                </pre>
              </div>
            )}
          </div>

          {/* Admin feedback form */}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Admin Review</p>

            <div className="flex gap-2">
              {(["under_review", "confirmed_phishing", "false_alarm"] as ReportStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setNewStatus(s)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    newStatus === s
                      ? STATUS_CONFIG[s].color + " ring-1"
                      : "border-white/10 text-gray-500 hover:border-white/20"
                  }`}
                >
                  {STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>

            <input
              value={feedbackTitle}
              onChange={(e) => setFeedbackTitle(e.target.value)}
              placeholder="Feedback headline (e.g. Good catch! This was phishing.)"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
            />

            <textarea
              value={feedbackBody}
              onChange={(e) => setFeedbackBody(e.target.value)}
              placeholder="Detailed explanation for the user..."
              rows={3}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none resize-none focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
            />

            <textarea
              value={redFlagsRaw}
              onChange={(e) => setRedFlagsRaw(e.target.value)}
              placeholder={"Red flags (one per line):\nSuspicious sender domain\nUrgency language\nMismatched URL"}
              rows={4}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none resize-none font-mono focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
            />

            <div className="flex justify-end">
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-700 disabled:opacity-50"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Shield size={14} />}
                {saving ? "Saving..." : "Save Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<PhishingReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | ReportStatus>("all");
  const [search, setSearch] = useState("");

  const isAdmin = user && ADMIN_UIDS.includes(user.uid);

  async function load() {
    setLoading(true);
    try {
      const data = await getAllReports();
      setReports(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Shield size={40} className="text-red-600 mx-auto mb-4" />
          <p className="text-white font-bold text-lg">Access Denied</p>
          <p className="text-gray-500 text-sm mt-1">Admin privileges required.</p>
        </div>
      </div>
    );
  }

  const filtered = reports
    .filter((r) => filter === "all" || r.status === filter)
    .filter((r) =>
      search.trim() === "" ||
      r.caseId.toLowerCase().includes(search.toLowerCase()) ||
      r.subject.toLowerCase().includes(search.toLowerCase()) ||
      r.sender.toLowerCase().includes(search.toLowerCase())
    );

  const counts = {
    all: reports.length,
    under_review: reports.filter((r) => r.status === "under_review").length,
    confirmed_phishing: reports.filter((r) => r.status === "confirmed_phishing").length,
    false_alarm: reports.filter((r) => r.status === "false_alarm").length,
  };

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

      <div className="relative max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={14} className="text-red-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-600">Admin</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Report Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Review and respond to submitted phishing reports.</p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([["all", "Total"], ["under_review", "Under Review"], ["confirmed_phishing", "Confirmed"], ["false_alarm", "False Alarm"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-xl border p-4 text-left transition-all ${
                filter === key
                  ? "border-red-600/40 bg-red-950/20"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <p className="text-xl font-black text-white">{counts[key]}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by case ID, subject, or sender..."
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder-gray-600 outline-none focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
          />
        </div>

        {/* Report list */}
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 size={24} className="animate-spin text-gray-600" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-gray-500 text-sm">No reports found.</p>
            </div>
          ) : (
            filtered.map((r) => (
              <ReportRow key={r.id} report={r} onUpdated={load} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}