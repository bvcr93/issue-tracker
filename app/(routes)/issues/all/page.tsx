import { IssueItem } from "@/components/ui/issue-item";
import { db } from "@/lib/db";
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
import IssueTable from "@/components/ui/issue-table";

export default async function AllIssyesPage() {
  const issues = await db.issue.findMany();
  return (
    <div className="maincol">
      <h1 className="my-10 text-center text-lg">List of all issues</h1>
      {issues.map((iss) => (
        <IssueTable {...iss} />
      ))}
    </div>
  );
}
