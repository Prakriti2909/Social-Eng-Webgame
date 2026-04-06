/*"use client";

import { useEffect, useState } from "react";

type ProgressCardProps = {
  title: string;
  percentage: number;
  color?: "blue" | "green" | "purple";
  icon?: React.ReactNode;
};

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  percentage,
  color = "blue",
  icon,
}) => {
  const [progressWidth, setProgressWidth] = useState(0);

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(percentage);
    }, 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  const colorMap = {
    blue: {
      bar: "bg-blue-500",
      iconBg: "bg-blue-900/40",
    },
    green: {
      bar: "bg-green-500",
      iconBg: "bg-green-900/40",
    },
    purple: {
      bar: "bg-purple-500",
      iconBg: "bg-purple-900/40",
    },
  };

  const selectedColor = colorMap[color];

  return (
    <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 w-full max-w-sm transition hover:shadow-lg hover:shadow-blue-500/10">
      
      {/* Top Row } 
      <div className="flex justify-between items-center mb-4">
        <div className={`p-3 rounded-lg ${selectedColor.iconBg}`}>
          {icon ? (
            icon
          ) : (
            <div className="w-5 h-5 bg-white rounded-sm" />
          )}
        </div>

        <span className="text-white font-semibold text-lg">
          {percentage}%
        </span>
      </div>

      {/* Title }
      <h3 className="text-gray-400 mb-4">{title}</h3>

      {/* Progress Bar Background }
      <div className="w-full bg-[#1e293b] h-2 rounded-full overflow-hidden">
        <div
          className={`${selectedColor.bar} h-2 rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressCard; */

"use client";

import { Users, DollarSign, AlertCircle, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: Users,
    value: "98%",
    label: "Of cyber attacks involve social engineering",
    color: "text-red-500",
    iconColor: "text-red-500",
    borderHover: "hover:border-red-700/50",
  },
  {
    icon: DollarSign,
    value: "$4.91M",
    label: "Average cost of a data breach in 2024",
    color: "text-yellow-400",
    iconColor: "text-yellow-400",
    borderHover: "hover:border-yellow-700/50",
  },
  {
    icon: AlertCircle,
    value: "91%",
    label: "Of attacks start with a phishing email",
    color: "text-orange-400",
    iconColor: "text-orange-400",
    borderHover: "hover:border-orange-700/50",
  },
  {
    icon: TrendingUp,
    value: "270%",
    label: "Increase in phishing since 2020",
    color: "text-cyan-400",
    iconColor: "text-cyan-400",
    borderHover: "hover:border-cyan-700/50",
  },
];

function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    // Extract numeric part and suffix
    const match = target.match(/^([^\d]*)(\d+\.?\d*)(.*)$/);
    if (!match) {
      setDisplay(target);
      return;
    }

    const prefix = match[1];
    const num = parseFloat(match[2]);
    const suffix = match[3];

    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * num;
      const formatted =
        num % 1 !== 0 ? value.toFixed(2) : Math.floor(value).toString();
      setDisplay(`${prefix}${formatted}${suffix}`);

      if (current >= steps) {
        setDisplay(target);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, target]);

  return display;
}

function StatCard({
  stat,
  inView,
}: {
  stat: (typeof stats)[0];
  inView: boolean;
}) {
  const Icon = stat.icon;
  const animated = useCountUp(stat.value, inView);

  return (
    <div
      className={`group relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#111111] p-7 transition-all duration-300 ${stat.borderHover} hover:bg-[#161616] hover:shadow-lg`}
    >
      {/* Icon */}
      <div className={`${stat.iconColor}`}>
        <Icon size={28} strokeWidth={1.8} />
      </div>

      {/* Animated number */}
      <p className={`text-5xl font-black tracking-tight ${stat.color}`}>
        {animated}
      </p>

      {/* Label */}
      <p className="text-sm leading-relaxed text-gray-400">{stat.label}</p>
    </div>
  );
}

export default function ProgressCard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black px-6 py-20">
      {/* Subtle top border separator */}
      <div className="mx-auto mb-14 max-w-6xl border-t border-white/5" />

      {/* Header */}
      <div className="mb-14 text-center">
        <h2 className="text-5xl font-black tracking-tight md:text-6xl">
          <span className="text-white">THE </span>
          <span className="text-red-500">REALITY</span>
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Alarming statistics about social engineering attacks
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.value} stat={stat} inView={inView} />
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-14 text-center text-sm italic text-gray-600">
        * Statistics sourced from various cybersecurity reports and research
        studies
      </p>
    </section>
  );
}
