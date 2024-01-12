"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Bug } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="w-full shadow-lg sticky top-0 bg-white z-50">
      <div className="maincol flex justify-between py-4 text-lg">
        <Link
          href={"/"}
          className="text-blue-500 font-semibold flex gap-5 items-center"
        >
          Issue Tracker
          <Bug className="text-black" />
        </Link>
        <div className="items-center gap-5 hidden md:flex">
          <Link href={"/dashboard"} className="font-light">
            Dashboard
          </Link>
          <Link href={"/issues"} className="font-light">
            Statistics
          </Link>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Issue tracker</SheetTitle>
                <SheetDescription className="flex flex-col font-semibold text-lg">
                  <Link href={"/issues"}>Issues</Link>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileNavOpen && (
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
