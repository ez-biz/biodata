"use client";

import { useState } from "react";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Loader2, RotateCcw } from "lucide-react";

export function AiAboutMe() {
  const { formData, updateSection } = useBiodataStore();
  const [tone, setTone] = useState("traditional");
  const [length, setLength] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/biodata/generate-aboutme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, tone, length }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed");
      }

      const { text } = await res.json();
      updateSection("lifestyle", { aboutMe: text });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gold-200 bg-gold-50/30 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-gold-600" />
        <span className="text-sm font-semibold text-maroon-900">
          AI About Me Generator
        </span>
      </div>

      <div className="flex gap-2">
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="traditional">Traditional</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="modern">Modern</SelectItem>
          </SelectContent>
        </Select>

        <Select value={length} onValueChange={setLength}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="long">Long</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={generate}
        disabled={loading}
        size="sm"
        className="w-full gap-2 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 text-xs"
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : formData.lifestyle.aboutMe ? (
          <RotateCcw className="h-3.5 w-3.5" />
        ) : (
          <Sparkles className="h-3.5 w-3.5" />
        )}
        {loading
          ? "Generating..."
          : formData.lifestyle.aboutMe
          ? "Regenerate"
          : "Generate About Me"}
      </Button>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      <p className="text-[11px] text-muted-foreground">
        Fill your personal and education details first for better results.
      </p>
    </div>
  );
}
