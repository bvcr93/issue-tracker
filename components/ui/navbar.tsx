"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Bug } from "lucide-react";

export default function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="w-full border-b sticky top-0">
      <div className="maincol flex justify-between py-4 text-lg">
        <Link href={"/"} className="text-blue-500 font-semibold flex gap-5 items-center">
          Issue Tracker
          <Bug className="text-black"/>
        </Link>
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
