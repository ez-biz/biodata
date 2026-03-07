import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — BiodataCraft",
  description:
    "Manage your marriage biodatas, view analytics, and track shared link views.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
