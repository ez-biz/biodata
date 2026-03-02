"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Smartphone, Bell, ArrowRight } from "lucide-react";
import Link from "next/link";

interface EmailDraftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailDraftModal({ open, onOpenChange }: EmailDraftModalProps) {
  const [showSignupNudge, setShowSignupNudge] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Instead of sending an email, nudge user to create an account
    setShowSignupNudge(true);
  };

  const handleClose = () => {
    setShowSignupNudge(false);
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!showSignupNudge ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-maroon-900">
                Save to Email
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Enter your email to get a link to resume your biodata later.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <Label htmlFor="save-email" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="save-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100"
              >
                Send Me the Link
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-maroon-900">
                Save Your Biodata Permanently
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Create a free account to never lose your work.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <div className="space-y-2.5">
                <div className="flex items-start gap-3 text-sm">
                  <Shield className="h-4 w-4 text-maroon-700 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Save your biodata permanently and access it from any device
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Smartphone className="h-4 w-4 text-maroon-700 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Edit on mobile, tablet, or desktop — always in sync
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Bell className="h-4 w-4 text-maroon-700 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Get email reminders to complete your biodata
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Button
                  asChild
                  className="w-full rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100"
                >
                  <Link href="/signup">
                    Create Free Account
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="w-full rounded-full text-muted-foreground hover:text-maroon-800"
                >
                  Continue as Guest
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
