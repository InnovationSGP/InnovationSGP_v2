"use client";
import React from "react";

// This component ensures we have a client component as the top level for the layout
export default function ClientOnlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);

  // Only show content after first render to ensure hydration matching
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with exact same structure to avoid layout shift
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="fixed top-0 left-0 right-0 z-50 h-20 bg-slate-900/80 backdrop-blur-md"></div>
        <main>{null}</main>
        <footer className="bg-slate-900 mt-auto"></footer>
      </div>
    );
  }

  return <>{children}</>;
}
