"use client";

import { useEffect, useState } from "react";
import { Users, IndianRupee, FileText, Crown, Loader2 } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalRevenue: number;
  totalBiodatas: number;
  activeSubscriptions: number;
}

const STAT_CARDS = [
  {
    key: "totalUsers" as const,
    label: "Total Users",
    icon: Users,
    format: (v: number) => v.toLocaleString("en-IN"),
    color: "bg-blue-500/20 text-blue-300",
    iconColor: "text-blue-400",
  },
  {
    key: "totalRevenue" as const,
    label: "Total Revenue",
    icon: IndianRupee,
    format: (v: number) =>
      `₹${(v / 100).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`,
    color: "bg-green-500/20 text-green-300",
    iconColor: "text-green-400",
  },
  {
    key: "totalBiodatas" as const,
    label: "Total Biodatas",
    icon: FileText,
    format: (v: number) => v.toLocaleString("en-IN"),
    color: "bg-gold-500/20 text-gold-300",
    iconColor: "text-gold-400",
  },
  {
    key: "activeSubscriptions" as const,
    label: "Active Subscriptions",
    icon: Crown,
    format: (v: number) => v.toLocaleString("en-IN"),
    color: "bg-purple-500/20 text-purple-300",
    iconColor: "text-purple-400",
  },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-gold-100">
        Dashboard
      </h1>
      <p className="mt-1 text-maroon-300">
        Overview of your BiodataCraft platform
      </p>

      {loading && (
        <div className="mt-12 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {stats && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {STAT_CARDS.map((card) => (
            <div
              key={card.key}
              className="rounded-2xl border border-maroon-700 bg-maroon-800 p-6 transition-shadow hover:shadow-lg hover:shadow-maroon-900/50"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-maroon-300">
                  {card.label}
                </p>
                <div className={`rounded-xl p-2.5 ${card.color}`}>
                  <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
              </div>
              <p className="mt-4 font-display text-3xl font-bold text-gold-100">
                {card.format(stats[card.key])}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
