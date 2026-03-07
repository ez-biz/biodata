import { redirect } from "next/navigation";

export default function DevThumbnailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }
  return <>{children}</>;
}
