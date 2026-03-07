"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Eye } from "lucide-react";
import type { BiodataFormData } from "@/lib/types/biodata";

interface ShareData {
  data: BiodataFormData;
  templateId: string;
  colorScheme: string;
  needsPassword: boolean;
  expired: boolean;
  photos: Array<{ url: string; type: string; sortOrder: number }>;
}

export default function SharedBiodataPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [needsPassword, setNeedsPassword] = useState(false);

  const fetchBiodata = async (pwd?: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/share/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.needsPassword) {
          setNeedsPassword(true);
        } else if (data.expired) {
          setError("This shared link has expired.");
        } else if (data.wrongPassword) {
          setError("Incorrect password. Please try again.");
        } else {
          setError(data.error || "Biodata not found.");
        }
        return;
      }

      setShareData(data);
      setNeedsPassword(false);
    } catch {
      setError("Failed to load biodata.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBiodata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gold-50/30 to-white">
        <Loader2 className="h-8 w-8 animate-spin text-maroon-600" />
      </div>
    );
  }

  if (error && !needsPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gold-50/30 to-white">
        <div className="text-center max-w-sm">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-maroon-50 flex items-center justify-center mb-4">
            <Eye className="h-6 w-6 text-maroon-400" />
          </div>
          <h1 className="font-display text-xl font-bold text-maroon-900 mb-2">
            Link Unavailable
          </h1>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (needsPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gold-50/30 to-white bg-paisley">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4">
          <div className="text-center mb-6">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-maroon-50 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-maroon-600" />
            </div>
            <h1 className="font-display text-xl font-bold text-maroon-900">
              Password Protected
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the password to view this biodata.
            </p>
          </div>
          {error && (
            <p className="text-sm text-red-500 text-center mb-3">{error}</p>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchBiodata(password);
            }}
            className="space-y-4"
          >
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="text-center"
            />
            <Button
              type="submit"
              className="w-full rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100"
            >
              View Biodata
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (!shareData) return null;

  // Render the biodata using a lightweight read-only view
  const pd = shareData.data.personalDetails;
  const ed = shareData.data.educationCareer;
  const fd = shareData.data.familyDetails;
  const cd = shareData.data.contactDetails;
  const profilePhoto = shareData.photos?.find((p) => p.type === "PROFILE");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50/30 to-white bg-paisley">
      <div className="container max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold-700">
            Marriage Biodata
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-maroon-100/50 overflow-hidden">
          {/* Name header */}
          <div className="bg-gradient-to-r from-maroon-800 to-maroon-900 text-white p-6 text-center">
            {profilePhoto && (
              <div className="flex justify-center mb-4">
                <img
                  src={profilePhoto.url}
                  alt="Profile"
                  className="w-24 h-32 object-cover rounded-lg border-2 border-gold-200/30 shadow-lg"
                />
              </div>
            )}
            <h1 className="font-display text-2xl font-bold">
              {pd.fullName || "Biodata"}
            </h1>
            {pd.currentCity && (
              <p className="text-gold-200 text-sm mt-1">
                {pd.currentCity}
                {pd.currentState ? `, ${pd.currentState}` : ""}
              </p>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Personal Details */}
            <Section title="Personal Details">
              <InfoGrid
                items={[
                  { label: "Date of Birth", value: pd.dateOfBirth },
                  { label: "Religion", value: pd.religion },
                  { label: "Caste", value: pd.caste },
                  { label: "Height", value: pd.height },
                  { label: "Complexion", value: pd.complexion },
                  { label: "Mother Tongue", value: pd.motherTongue },
                ]}
              />
            </Section>

            {/* Education */}
            <Section title="Education & Career">
              <InfoGrid
                items={[
                  { label: "Education", value: ed.highestEducation },
                  { label: "Details", value: ed.educationDetails },
                  { label: "Occupation", value: ed.occupation },
                  { label: "Company", value: ed.companyName },
                  { label: "Income", value: ed.annualIncome },
                  { label: "Work Location", value: ed.workLocation },
                ]}
              />
            </Section>

            {/* Family */}
            <Section title="Family Details">
              <InfoGrid
                items={[
                  { label: "Father's Name", value: fd.fatherName },
                  { label: "Father's Occupation", value: fd.fatherOccupation },
                  { label: "Mother's Name", value: fd.motherName },
                  { label: "Mother's Occupation", value: fd.motherOccupation },
                  { label: "Brothers", value: fd.brothers?.toString() },
                  { label: "Sisters", value: fd.sisters?.toString() },
                  { label: "Family Type", value: fd.familyType },
                  { label: "Family Status", value: fd.familyStatus },
                ]}
              />
            </Section>

            {/* Contact */}
            {(cd.showPhone || cd.showEmail || cd.showWhatsapp) && (
              <Section title="Contact">
                <InfoGrid
                  items={[
                    cd.showPhone
                      ? { label: "Phone", value: `+91 ${cd.phone}` }
                      : null,
                    cd.showEmail
                      ? { label: "Email", value: cd.email }
                      : null,
                    cd.showWhatsapp
                      ? { label: "WhatsApp", value: cd.whatsapp }
                      : null,
                    { label: "Contact Person", value: cd.contactPersonName },
                    { label: "Relation", value: cd.contactRelation },
                  ].filter(Boolean) as { label: string; value?: string }[]}
                />
              </Section>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-maroon-100/50 px-6 py-4 text-center">
            <p className="text-xs text-muted-foreground">
              Created with{" "}
              <a href="/" className="text-maroon-700 font-medium hover:underline">
                BiodataCraft
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-sm font-bold text-maroon-800 uppercase tracking-wider mb-3 pb-1.5 border-b border-maroon-100/50">
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoGrid({
  items,
}: {
  items: { label: string; value?: string | null }[];
}) {
  const filtered = items.filter((i) => i.value);
  if (filtered.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      {filtered.map((item) => (
        <div key={item.label}>
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {item.label}
          </span>
          <p className="text-sm font-medium text-maroon-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
