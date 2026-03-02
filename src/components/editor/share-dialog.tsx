"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Copy,
  Check,
  Link2,
  Lock,
  Loader2,
  Share2,
  Crown,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { trackUpsellShown, trackUpsellClicked } from "@/lib/analytics";
import { useEffect, useRef } from "react";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  biodataId: string;
  onUpgrade?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ShareDialog({ isOpen, onClose, biodataId, onUpgrade }: ShareDialogProps) {
  const { data: session } = useSession();
  const [shareUrl, setShareUrl] = useState("");
  const [password, setPassword] = useState("");
  const [usePassword, setUsePassword] = useState(false);
  const [expiry, setExpiry] = useState("none");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const upsellTrackedRef = useRef(false);

  const userTier =
    (session?.user as { tier?: string } | undefined)?.tier || "FREE";
  const isFreeUser = userTier === "FREE";

  useEffect(() => {
    if (isOpen && isFreeUser && !upsellTrackedRef.current) {
      trackUpsellShown("share_dialog", "inline");
      upsellTrackedRef.current = true;
    }
    if (!isOpen) {
      upsellTrackedRef.current = false;
    }
  }, [isOpen, isFreeUser]);

  const generateLink = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/biodata/${biodataId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: usePassword ? password : undefined,
          expiresInDays: expiry !== "none" ? parseInt(expiry) : undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setShareUrl(data.shareUrl);
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out my marriage biodata: ${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Share2 className="h-5 w-5 text-maroon-700" />
            <h2 className="font-display text-lg font-bold text-maroon-900">
              Share Biodata
            </h2>
          </div>

          {!shareUrl ? (
            <div className="space-y-4">
              {/* Password option */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setUsePassword(!usePassword)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    usePassword ? "bg-maroon-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      usePassword ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <Label className="text-sm flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" />
                  Password protect
                </Label>
              </div>

              {usePassword && (
                <Input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set a password"
                  className="text-sm"
                />
              )}

              {/* Expiry */}
              <div>
                <Label className="text-sm mb-1.5 block">Link expires in</Label>
                <Select value={expiry} onValueChange={setExpiry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Never</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subtle upgrade upsell for free users */}
              {isFreeUser && (
                <div className="rounded-xl border border-gold-200 bg-gradient-to-r from-gold-50/50 to-maroon-50/30 p-3">
                  <div className="flex items-start gap-2">
                    <Crown className="h-4 w-4 text-gold-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Upgrade to add <span className="font-semibold text-maroon-800">password protection</span> and{" "}
                        <span className="font-semibold text-maroon-800">set expiry dates</span> for your shared links
                      </p>
                      {onUpgrade && (
                        <button
                          onClick={() => {
                            trackUpsellClicked("share_dialog", "inline");
                            onUpgrade();
                          }}
                          className="mt-1.5 text-[11px] font-semibold text-maroon-800 hover:text-maroon-600 transition-colors"
                        >
                          Upgrade for ₹199 &rarr;
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={generateLink}
                disabled={loading}
                className="w-full rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 gap-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
                Generate Share Link
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Share URL */}
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="text-sm bg-gray-50"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="flex-shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Share options */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={shareViaWhatsApp}
                  className="rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 text-sm"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="rounded-full gap-2 text-sm border-maroon-200 text-maroon-800"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={() => setShareUrl("")}
                className="w-full text-sm text-muted-foreground"
              >
                Generate New Link
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
