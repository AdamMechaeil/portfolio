import type { Metadata } from "next";

// The dashboard is private: keep it out of search results and link previews.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-black text-white">{children}</div>;
}
