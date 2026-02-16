"use client";

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
      
      {/* Top Row */}
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

      {/* Title */}
      <h3 className="text-gray-400 mb-4">{title}</h3>

      {/* Progress Bar Background */}
      <div className="w-full bg-[#1e293b] h-2 rounded-full overflow-hidden">
        <div
          className={`${selectedColor.bar} h-2 rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressCard;
