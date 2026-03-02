"use client";

import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";

interface UserItem {
  id: string;
  name: string | null;
  email: string;
  tier: string;
  createdAt: string;
  _count: { biodatas: number };
}

const TIERS = ["ALL", "FREE", "PREMIUM", "UNLIMITED", "FAMILY"];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (tier && tier !== "ALL") params.set("tier", tier);
      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setUsers(data.users);
    } catch {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [search, tier]);

  useEffect(() => {
    const timeout = setTimeout(fetchUsers, 300);
    return () => clearTimeout(timeout);
  }, [fetchUsers]);

  const handleChangeTier = async (userId: string, newTier: string) => {
    setUpdatingId(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, tier: newTier }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, tier: newTier } : u))
      );
    } catch {
      console.error("Failed to update user tier");
    } finally {
      setUpdatingId(null);
    }
  };

  const tierBadgeColor = (t: string) => {
    switch (t) {
      case "PREMIUM":
        return "bg-gold-500/20 text-gold-300 border-gold-500/30";
      case "UNLIMITED":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "FAMILY":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-maroon-700/50 text-maroon-300 border-maroon-600";
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-gold-100">Users</h1>
      <p className="mt-1 text-maroon-300">Manage platform users and tiers</p>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-maroon-400" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-maroon-700 bg-maroon-800 pl-10 text-gold-100 placeholder:text-maroon-400 focus:border-gold-500 focus:ring-gold-500/20"
          />
        </div>
        <Select value={tier} onValueChange={setTier}>
          <SelectTrigger className="w-[160px] border-maroon-700 bg-maroon-800 text-gold-100">
            <SelectValue placeholder="Filter by tier" />
          </SelectTrigger>
          <SelectContent className="border-maroon-700 bg-maroon-800">
            {TIERS.map((t) => (
              <SelectItem
                key={t}
                value={t}
                className="text-gold-100 focus:bg-maroon-700 focus:text-gold-100"
              >
                {t === "ALL" ? "All Tiers" : t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-maroon-700 bg-maroon-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-maroon-700 text-left">
              <th className="px-6 py-4 font-medium text-maroon-300">Name</th>
              <th className="px-6 py-4 font-medium text-maroon-300">Email</th>
              <th className="px-6 py-4 font-medium text-maroon-300">Tier</th>
              <th className="px-6 py-4 font-medium text-maroon-300">
                Biodatas
              </th>
              <th className="px-6 py-4 font-medium text-maroon-300">Joined</th>
              <th className="px-6 py-4 font-medium text-maroon-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-gold-400" />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-maroon-400"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-maroon-700/50 transition-colors hover:bg-maroon-700/30"
                >
                  <td className="px-6 py-4 text-gold-100">
                    {user.name || "—"}
                  </td>
                  <td className="px-6 py-4 text-maroon-200">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${tierBadgeColor(
                        user.tier
                      )}`}
                    >
                      {user.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-display text-gold-100">
                    {user._count.biodatas}
                  </td>
                  <td className="px-6 py-4 text-maroon-300">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <Select
                      value={user.tier}
                      onValueChange={(val) => handleChangeTier(user.id, val)}
                      disabled={updatingId === user.id}
                    >
                      <SelectTrigger className="h-8 w-[130px] border-maroon-600 bg-maroon-700 text-xs text-gold-100">
                        {updatingId === user.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <SelectValue />
                        )}
                      </SelectTrigger>
                      <SelectContent className="border-maroon-700 bg-maroon-800">
                        {TIERS.filter((t) => t !== "ALL").map((t) => (
                          <SelectItem
                            key={t}
                            value={t}
                            className="text-xs text-gold-100 focus:bg-maroon-700 focus:text-gold-100"
                          >
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
