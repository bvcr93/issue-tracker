import { db } from "@/lib/db";
import { Issue } from "@prisma/client";
import React from "react";

export default async function CloseIssuesPage() {
  const issues:Issue[] = await db.issue.findMany();
  const closedIssues = issues.filter((issue) => issue.status === "CLOSED");
  return (
    <div className="maincol">
      {closedIssues.map((issue) => (
        <div>{issue.title}</div>
      ))}
    </div>
  );
}
