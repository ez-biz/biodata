"use client";

import { useState } from "react";
import { Navbar } from "@/components/marketing/navbar";
import { BiodataWizard } from "@/components/forms/biodata-wizard";
import { BiodataPreview } from "@/components/editor/biodata-preview";
import { Button } from "@/components/ui/button";
import { X, PanelRightOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreatePage() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container px-4 py-6">
        <div className="flex gap-6">
          {/* Form side */}
          <div
            className={cn(
              "flex-1 transition-all",
              showPreview ? "hidden lg:block lg:flex-1" : "w-full"
            )}
          >
            <BiodataWizard onPreview={() => setShowPreview(true)} />
          </div>

          {/* Preview side */}
          {showPreview && (
            <div className="flex-1 relative">
              <div className="sticky top-20">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Live Preview</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="lg:hidden"
                      onClick={() => setShowPreview(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <BiodataPreview />
              </div>
            </div>
          )}
        </div>

        {/* Mobile preview toggle */}
        {!showPreview && (
          <div className="fixed bottom-6 right-6 lg:hidden">
            <Button
              size="lg"
              className="rounded-full shadow-lg gap-2"
              onClick={() => setShowPreview(true)}
            >
              <PanelRightOpen className="h-4 w-4" />
              Preview
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
