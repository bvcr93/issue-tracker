import ClosedIssueItem from "@/components/ui/closed-issue-item";
import { db } from "@/lib/db";
import { Issue } from "@prisma/client";
import { Trash } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function CloseIssuesPage() {
  const issues: Issue[] = await db.issue.findMany();
  const closedIssues = issues.filter((issue) => issue.status === "CLOSED");

  if (closedIssues.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl">
        No closed issues to show
      </div>
    );
  }
  return (
    <div className="maincol mt-20">
      <table className="border-collapse w-full md:flex md:flex-col">
        {closedIssues.map((issue) => (
          <ClosedIssueItem {...issue} key={issue.id} />
        ))}
      </table>
    </div>
  );
}
