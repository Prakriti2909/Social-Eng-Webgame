import { Shield } from "lucide-react";
import Link from "next/link";

const resources = ["Documentation", "Blog", "Case Studies", "Training"];
const company = ["About Us", "Contact", "Privacy Policy", "Terms of Service"];

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <Shield size={22} className="text-red-500" />
              <span className="text-lg font-bold text-white">SecAware</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Empowering individuals and organizations with knowledge to defend
              against social engineering attacks.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: TwitterIcon, label: "Twitter" },
                { Icon: GithubIcon, label: "GitHub" },
                { Icon: LinkedInIcon, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          {/* Resources column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white">Resources</h4>
            <ul className="flex flex-col gap-3">
              {resources.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 transition-colors duration-200 hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white">Company</h4>
            <ul className="flex flex-col gap-3">
              {company.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 transition-colors duration-200 hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-gray-600 sm:flex-row">
          <span>© 2026 SecAware. All rights reserved. Educational purposes only.</span>
          <span className="flex items-center gap-1">
            Made with{" "}
            <span className="text-red-500">♥</span>{" "}
            for a safer digital world
          </span>
        </div>
      </div>
    </footer>
  );
}