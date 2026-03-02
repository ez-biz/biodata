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
    <div className="min-h-screen bg-gradient-to-b from-gold-50/30 to-white bg-paisley">
      <Navbar />

      <div className="container px-4 py-8">
        <div className="flex gap-8">
          {/* Form side */}
          <div
            className={cn(
              "flex-1 transition-all duration-300",
              showPreview ? "hidden lg:block lg:flex-1" : "w-full"
            )}
          >
            <BiodataWizard onPreview={() => setShowPreview(true)} />
          </div>

          {/* Preview side */}
          {showPreview && (
            <div className="flex-1 relative animate-fade-in">
              <div className="sticky top-20">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-display text-lg font-semibold text-maroon-900">
                    Live Preview
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden text-muted-foreground hover:text-maroon-800"
                    onClick={() => setShowPreview(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <BiodataPreview />
              </div>
            </div>
          )}
        </div>

        {/* Mobile preview FAB */}
        {!showPreview && (
          <div className="fixed bottom-6 right-6 lg:hidden z-40">
            <Button
              size="lg"
              className="rounded-full shadow-xl shadow-maroon-900/20 gap-2 bg-maroon-800 hover:bg-maroon-700 text-gold-100 px-6"
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
