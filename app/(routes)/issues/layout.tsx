import React, { ReactNode } from "react";

export default function RoutesLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
