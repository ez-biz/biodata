"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  FileText,
  Calendar,
  Edit,
  Trash2,
  Copy,
  Loader2,
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

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [biodatas, setBiodatas] = useState<BiodataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/biodata")
        .then((r) => r.json())
        .then((data) => {
          setBiodatas(data);
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Biodatas</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {session?.user?.name || "User"}
            </p>
          </div>
          <Link href="/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New
            </Button>
          </Link>
        </div>

        {biodatas.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-lg font-semibold mb-2">No biodatas yet</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first biodata in just a few minutes
            </p>
            <Link href="/create">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create My Biodata
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {biodatas.map((biodata) => {
              const template = getTemplateById(biodata.templateId);
              const pd = biodata.data?.personalDetails;
              const name = pd?.fullName || "Untitled Biodata";

              return (
                <Card key={biodata.id} className="overflow-hidden">
                  <div
                    className="h-2"
                    style={{
                      backgroundColor:
                        template?.colorSchemes[0]?.primary || "#800020",
                    }}
                  />
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {template?.name || "Template"}
                        </p>
                      </div>
                      <Badge
                        variant={
                          biodata.status === "COMPLETED"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {biodata.status === "DRAFT" ? "Draft" : "Completed"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                      <Calendar className="h-3 w-3" />
                      Updated{" "}
                      {new Date(biodata.updatedAt).toLocaleDateString("en-IN")}
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/create?biodata=${biodata.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() =>
                          router.push(
                            `/create?duplicate=${biodata.id}`
                          )
                        }
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-destructive hover:text-destructive"
                        onClick={() => deleteBiodata(biodata.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
