"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="w-full border-b sticky top-0">
      <div className="maincol flex justify-between py-4 text-lg">
        <div className="text-blue-500 font-semibold">Issue Tracker</div>
        <div className="items-center gap-5 hidden md:flex">
          <div className="font-light">Dashboard</div>
          <Link href={"/issues"} className="font-light">
            Issues
          </Link>
        </div>
        <div className="md:hidden">
          <Menu className="cursor-pointer" onClick={toggleMobileNav} />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileNavOpen && (
        <div className="md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl">
          <div className="flex flex-col items-center py-4 mt-10">
            <div>Dashboard</div>
            <Link href={"/issues"}>Issues</Link>
          </div>
        </div>
      )}

      {/* Overlay for closing the sidebar */}
      {isMobileNavOpen && (
        <div
          className="md:hidden fixed top-0 left-0 h-full w-full"
          onClick={toggleMobileNav}
        ></div>
      )}
    </div>
  );
}
