import IssuesSidebar from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

export default function RoutesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full relative bg-slate-100">
      <div className="hidden z-50 h-full md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 z-80 border mt-[60px]">
        <IssuesSidebar />
      </div>
      <main className="md:pl-56 2xl:pl-0 pb-10">{children}</main>
    </div>
  );
}
