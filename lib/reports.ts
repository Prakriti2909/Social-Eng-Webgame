import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "./firebase";

export const db = getFirestore(app);

export type ReportStatus = "under_review" | "confirmed_phishing" | "false_alarm";

export interface PhishingReport {
  id?: string;
  caseId: string;
  userId: string;
  userDisplayName: string;
  sender: string;
  subject: string;
  body: string;
  urls: string;
  status: ReportStatus;
  submittedAt: Timestamp | null;
  // Admin feedback fields
  verdict?: string;        // "confirmed_phishing" | "false_alarm"
  feedbackTitle?: string;  // e.g. "Good catch! This was phishing."
  feedbackBody?: string;   // Detailed explanation of red flags
  redFlags?: string[];     // List of specific red flags identified
  reviewedAt?: Timestamp | null;
}

function generateCaseId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const prefix = "PHX";
  const rand = Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `${prefix}-${rand}`;
}

export async function submitReport(
  data: Omit<PhishingReport, "id" | "caseId" | "submittedAt" | "status">
): Promise<string> {
  const caseId = generateCaseId();
  const docRef = await addDoc(collection(db, "reports"), {
    ...data,
    caseId,
    status: "under_review" as ReportStatus,
    submittedAt: serverTimestamp(),
  });
  return caseId;
}

export async function getAllReports(): Promise<PhishingReport[]> {
  const q = query(collection(db, "reports"), orderBy("submittedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PhishingReport));
}

export async function getReportById(id: string): Promise<PhishingReport | null> {
  const snap = await getDoc(doc(db, "reports", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as PhishingReport;
}

export async function getReportsByCaseId(caseId: string): Promise<PhishingReport | null> {
  const all = await getAllReports();
  return all.find((r) => r.caseId === caseId) ?? null;
}

export async function updateReportStatus(
  id: string,
  status: ReportStatus,
  feedback: {
    feedbackTitle: string;
    feedbackBody: string;
    redFlags: string[];
  }
): Promise<void> {
  await updateDoc(doc(db, "reports", id), {
    status,
    verdict: status,
    ...feedback,
    reviewedAt: serverTimestamp(),
  });
}

export async function getRecentPublicReports(n = 20): Promise<PhishingReport[]> {
  const q = query(
    collection(db, "reports"),
    orderBy("submittedAt", "desc"),
    limit(n)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PhishingReport));
}