"use client";
import { cn } from "@/lib/utils";
import { MessageSquare, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function IssuesSidebar() {
  const routes = [
    {
      label: "All issues",
      icon: MessageSquare,
      href: "/issues/all",
      color: "text-violet-500",
    },
    {
      label: "Settings",
      icon: Settings,
      color: "text-pink-700",
      href: "/issues/settings",
    },
  ];
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full mt-12 bg-white">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-indigo-500" : "text-zinc-500"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
