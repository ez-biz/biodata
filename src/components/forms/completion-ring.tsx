"use client";

import { cn } from "@/lib/utils";

interface CompletionRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
}

export function CompletionRing({
  percentage,
  size = 44,
  strokeWidth = 4,
  className,
  showLabel = true,
}: CompletionRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colorClass =
    percentage >= 67
      ? "text-emerald-500"
      : percentage >= 34
      ? "text-amber-500"
      : "text-red-500";

  const trackColor =
    percentage >= 67
      ? "text-emerald-100"
      : percentage >= 34
      ? "text-amber-100"
      : "text-red-100";

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={trackColor}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(colorClass, "transition-all duration-700 ease-out")}
        />
      </svg>
      {showLabel && (
        <span
          className={cn(
            "absolute text-[10px] font-bold leading-none",
            colorClass
          )}
        >
          {percentage}%
        </span>
      )}
    </div>
  );
}
