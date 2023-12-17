import { deleteIssueAction } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import { IssueItem } from "@/components/ui/issue-item";
import { db } from "@/lib/db";
import { Issue } from "@prisma/client";
import { Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function IssuesPage() {
  const issues = await db.issue.findMany();

  return (
    <div className="maincol">
      <div className="py-10">
        <Link href={"/issues/new"}>
          <Button className="mt-10">New Issue</Button>
        </Link>
      </div>
      {issues.map((issue) => (
        <div key={issue.id} className="mb-4">
          <Link href={`/issues/${issue.id}`}>
            <IssueItem issue={issue} />
            <div>
              <Trash className="mt-3 text-black" />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
