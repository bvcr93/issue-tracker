import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="w-full border-b">
      <div className="maincol flex justify-between py-4">
        <div>Tracker</div>

        <div className="flex items-center">
          <div>Dashboard</div>
          <Link href={"/issues"}>Issues</Link>
        </div>
      </div>
    </div>
  );
}
