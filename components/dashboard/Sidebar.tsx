"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  Shield,
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/training", label: "Training", icon: BookOpen },
  { href: "/dashboard/progress", label: "My Progress", icon: TrendingUp },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await signOut(auth);
    router.push("/auth/login");
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between py-6 px-4">
      {/* Logo */}
      <div>
        <div className="mb-8 flex items-center gap-3 px-2">
          <Shield className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.7)]" size={28} strokeWidth={1.5} />
          <span className="text-lg font-black tracking-widest text-white uppercase">SocEng</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-red-600/15 text-red-400 ring-1 ring-red-600/30"
                    : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User + logout */}
      <div className="border-t border-white/10 pt-4">
        <div className="mb-3 px-2">
          <p className="text-xs font-semibold text-white">{user?.displayName || "User"}</p>
          <p className="truncate text-xs text-gray-600">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-all hover:bg-white/5 hover:text-red-400"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-white/10 bg-black lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/10 bg-black px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <Shield className="text-red-600" size={22} strokeWidth={1.5} />
          <span className="text-sm font-black tracking-widest text-white uppercase">SocEng</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-gray-400">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-56 border-r border-white/10 bg-black">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}