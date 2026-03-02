"use client";

import { useEffect, useState } from "react";
import { Loader2, CreditCard } from "lucide-react";

interface PaymentItem {
  id: string;
  amount: number;
  currency: string;
  status: string;
  plan: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/payments")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch payments");
        return res.json();
      })
      .then((data) => setPayments(data.payments))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "FAILED":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "REFUNDED":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default:
        return "bg-maroon-700/50 text-maroon-300 border-maroon-600";
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-gold-100">
        Payments
      </h1>
      <p className="mt-1 text-maroon-300">View all platform transactions</p>

      {error && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-maroon-700 bg-maroon-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-maroon-700 text-left">
              <th className="px-6 py-4 font-medium text-maroon-300">User</th>
              <th className="px-6 py-4 font-medium text-maroon-300">Amount</th>
              <th className="px-6 py-4 font-medium text-maroon-300">Plan</th>
              <th className="px-6 py-4 font-medium text-maroon-300">Status</th>
              <th className="px-6 py-4 font-medium text-maroon-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-gold-400" />
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-maroon-400"
                >
                  <CreditCard className="mx-auto mb-2 h-8 w-8 text-maroon-600" />
                  No payments yet
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-maroon-700/50 transition-colors hover:bg-maroon-700/30"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gold-100">
                        {payment.user.name || "—"}
                      </p>
                      <p className="text-xs text-maroon-400">
                        {payment.user.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-display font-semibold text-gold-100">
                    ₹{(payment.amount / 100).toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4 text-maroon-200">{payment.plan}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${statusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-maroon-300">
                    {new Date(payment.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
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
