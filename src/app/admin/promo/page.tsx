"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, TicketPercent, Check, X } from "lucide-react";

interface PromoCode {
  id: string;
  code: string;
  discountPercent: number | null;
  discountAmount: number | null;
  maxUses: number | null;
  currentUses: number;
  expiresAt: string | null;
  applicablePlans: string[];
  isActive: boolean;
  createdAt: string;
}

const PLAN_OPTIONS = ["PREMIUM", "UNLIMITED", "FAMILY"];

export default function AdminPromoPage() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);

  const fetchPromos = () => {
    setLoading(true);
    fetch("/api/admin/promo")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setPromoCodes(data.promoCodes))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const togglePlan = (plan: string) => {
    setSelectedPlans((prev) =>
      prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan]
    );
  };

  const resetForm = () => {
    setCode("");
    setDiscountPercent("");
    setDiscountAmount("");
    setMaxUses("");
    setExpiresAt("");
    setSelectedPlans([]);
    setIsActive(true);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError("");

    try {
      const res = await fetch("/api/admin/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          discountPercent: discountPercent || null,
          discountAmount: discountAmount || null,
          maxUses: maxUses || null,
          expiresAt: expiresAt || null,
          applicablePlans: selectedPlans,
          isActive,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create");
      }

      resetForm();
      setShowForm(false);
      fetchPromos();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create promo code");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gold-100">
            Promo Codes
          </h1>
          <p className="mt-1 text-maroon-300">
            Create and manage discount codes
          </p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) resetForm();
          }}
          className="bg-gold-500 text-maroon-900 hover:bg-gold-400"
        >
          {showForm ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              New Code
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-maroon-700 bg-maroon-800 p-6"
        >
          <h2 className="font-display text-lg font-semibold text-gold-100">
            Create Promo Code
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label className="text-maroon-200">
                Code <span className="text-red-400">*</span>
              </Label>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. DIWALI50"
                required
                className="mt-1 border-maroon-700 bg-maroon-900 text-gold-100 placeholder:text-maroon-500 focus:border-gold-500"
              />
            </div>

            <div>
              <Label className="text-maroon-200">Discount %</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="e.g. 25"
                className="mt-1 border-maroon-700 bg-maroon-900 text-gold-100 placeholder:text-maroon-500 focus:border-gold-500"
              />
            </div>

            <div>
              <Label className="text-maroon-200">Discount Amount (paise)</Label>
              <Input
                type="number"
                min="0"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                placeholder="e.g. 5000 = ₹50"
                className="mt-1 border-maroon-700 bg-maroon-900 text-gold-100 placeholder:text-maroon-500 focus:border-gold-500"
              />
            </div>

            <div>
              <Label className="text-maroon-200">Max Uses</Label>
              <Input
                type="number"
                min="0"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
                placeholder="Leave blank for unlimited"
                className="mt-1 border-maroon-700 bg-maroon-900 text-gold-100 placeholder:text-maroon-500 focus:border-gold-500"
              />
            </div>

            <div>
              <Label className="text-maroon-200">Expires At</Label>
              <Input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="mt-1 border-maroon-700 bg-maroon-900 text-gold-100 focus:border-gold-500"
              />
            </div>

            <div>
              <Label className="text-maroon-200">Applicable Plans</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {PLAN_OPTIONS.map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => togglePlan(plan)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      selectedPlans.includes(plan)
                        ? "border-gold-500 bg-gold-500/20 text-gold-300"
                        : "border-maroon-600 bg-maroon-700 text-maroon-300 hover:border-maroon-500"
                    }`}
                  >
                    {plan}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active toggle */}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isActive ? "bg-gold-500" : "bg-maroon-600"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  isActive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <Label className="text-maroon-200">
              {isActive ? "Active" : "Inactive"}
            </Label>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              disabled={creating || !code}
              className="bg-gold-500 text-maroon-900 hover:bg-gold-400 disabled:opacity-50"
            >
              {creating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}
              Create Promo Code
            </Button>
          </div>
        </form>
      )}

      {/* Existing codes table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-maroon-700 bg-maroon-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-maroon-700 text-left">
              <th className="px-6 py-4 font-medium text-maroon-300">Code</th>
              <th className="px-6 py-4 font-medium text-maroon-300">
                Discount
              </th>
              <th className="px-6 py-4 font-medium text-maroon-300">Usage</th>
              <th className="px-6 py-4 font-medium text-maroon-300">Plans</th>
              <th className="px-6 py-4 font-medium text-maroon-300">
                Expires
              </th>
              <th className="px-6 py-4 font-medium text-maroon-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-gold-400" />
                </td>
              </tr>
            ) : promoCodes.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-maroon-400"
                >
                  <TicketPercent className="mx-auto mb-2 h-8 w-8 text-maroon-600" />
                  No promo codes yet
                </td>
              </tr>
            ) : (
              promoCodes.map((promo) => (
                <tr
                  key={promo.id}
                  className="border-b border-maroon-700/50 transition-colors hover:bg-maroon-700/30"
                >
                  <td className="px-6 py-4">
                    <code className="rounded bg-maroon-700 px-2 py-1 font-mono text-sm font-semibold text-gold-300">
                      {promo.code}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-gold-100">
                    {promo.discountPercent
                      ? `${promo.discountPercent}%`
                      : promo.discountAmount
                      ? `₹${(promo.discountAmount / 100).toLocaleString(
                          "en-IN"
                        )}`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-maroon-200">
                    {promo.currentUses}
                    {promo.maxUses ? ` / ${promo.maxUses}` : " / ∞"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {promo.applicablePlans.length > 0 ? (
                        promo.applicablePlans.map((plan) => (
                          <span
                            key={plan}
                            className="rounded bg-maroon-700 px-2 py-0.5 text-xs text-maroon-200"
                          >
                            {plan}
                          </span>
                        ))
                      ) : (
                        <span className="text-maroon-400">All</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-maroon-300">
                    {promo.expiresAt
                      ? new Date(promo.expiresAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Never"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${
                        promo.isActive
                          ? "border-green-500/30 bg-green-500/20 text-green-300"
                          : "border-red-500/30 bg-red-500/20 text-red-300"
                      }`}
                    >
                      {promo.isActive ? "Active" : "Inactive"}
                    </span>
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
