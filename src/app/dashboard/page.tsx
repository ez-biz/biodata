"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FileText,
  Calendar,
  Edit,
  Trash2,
  Copy,
  Loader2,
  Eye,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { getTemplateById } from "@/lib/templates/template-config";
import type { BiodataFormData } from "@/lib/types/biodata";

interface BiodataItem {
  id: string;
  templateId: string;
  status: string;
  data: BiodataFormData;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Analytics {
  totalBiodatas: number;
  totalViews: number;
  recentViews: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [biodatas, setBiodatas] = useState<BiodataItem[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      Promise.all([
        fetch("/api/biodata").then((r) => r.json()),
        fetch("/api/biodata/analytics").then((r) => r.json()),
      ])
        .then(([biodataData, analyticsData]) => {
          setBiodatas(biodataData);
          setAnalytics(analyticsData);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status]);

  const deleteBiodata = async (id: string) => {
    if (!confirm("Are you sure you want to delete this biodata?")) return;
    await fetch(`/api/biodata/${id}`, { method: "DELETE" });
    setBiodatas((prev) => prev.filter((b) => b.id !== id));
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gold-50/30 to-white">
        <Navbar />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-maroon-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50/30 to-white bg-paisley">
      <Navbar />

      <div className="container px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-maroon-900">
              My Biodatas
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome back, {session?.user?.name || "User"}
            </p>
          </div>
          <Link href="/create">
            <Button className="gap-2 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 px-5 shadow-sm">
              <Plus className="h-4 w-4" />
              Create New
            </Button>
          </Link>
        </div>

        {/* Analytics Stats */}
        {analytics && analytics.totalBiodatas > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-up">
            <div className="rounded-2xl border border-maroon-100/50 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-maroon-50 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-maroon-600" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-maroon-900">
                    {analytics.totalBiodatas}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Biodatas</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-maroon-100/50 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-gold-600" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-maroon-900">
                    {analytics.totalViews}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-maroon-100/50 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-maroon-900">
                    {analytics.recentViews}
                  </p>
                  <p className="text-xs text-muted-foreground">Views (7 days)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {biodatas.length === 0 ? (
          <div className="rounded-2xl border border-maroon-100/50 bg-white p-16 text-center animate-fade-up">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-maroon-50 flex items-center justify-center mb-5">
              <FileText className="h-7 w-7 text-maroon-400" />
            </div>
            <h2 className="font-display text-xl font-semibold text-maroon-900 mb-2">
              No biodatas yet
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Create your first biodata in just a few minutes. Choose a
              template, fill your details, and download.
            </p>
            <Link href="/create">
              <Button className="gap-2 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 px-6">
                <Plus className="h-4 w-4" />
                Create My First Biodata
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {biodatas.map((biodata) => {
              const template = getTemplateById(biodata.templateId);
              const pd = biodata.data?.personalDetails;
              const name = pd?.fullName || "Untitled Biodata";

              return (
                <div
                  key={biodata.id}
                  className="group rounded-2xl border border-maroon-100/50 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-maroon-900/5 hover:border-maroon-200/60"
                >
                  {/* Color accent bar */}
                  <div
                    className="h-1.5"
                    style={{
                      background: `linear-gradient(90deg, ${
                        template?.colorSchemes[0]?.primary || "#831843"
                      }, ${
                        template?.colorSchemes[0]?.secondary || "#D4A537"
                      })`,
                    }}
                  />

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display font-semibold text-maroon-900">
                          {name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {template?.name || "Template"}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                          biodata.status === "COMPLETED"
                            ? "bg-green-50 text-green-700"
                            : biodata.status === "PUBLISHED"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gold-50 text-gold-700"
                        }`}
                      >
                        {biodata.status === "DRAFT"
                          ? "Draft"
                          : biodata.status === "PUBLISHED"
                          ? "Live"
                          : "Done"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(biodata.updatedAt).toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </span>
                      {biodata.status === "PUBLISHED" && (
                        <span className="flex items-center gap-1 text-maroon-600">
                          <BarChart3 className="h-3 w-3" />
                          Shared
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/create?biodata=${biodata.id}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-1.5 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50"
                        >
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-maroon-200 text-maroon-600 hover:bg-maroon-50"
                        onClick={() =>
                          router.push(`/create?duplicate=${biodata.id}`)
                        }
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300"
                        onClick={() => deleteBiodata(biodata.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
