import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function IssuesPage() {
  return (
    <div className="maincol">
      <Link href={"/issues/new"}>
        <Button>New Issue</Button>
      </Link>
    </div>
  );
}
