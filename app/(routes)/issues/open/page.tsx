import { db } from "@/lib/db";
import React from "react";

export default async function OpenIssuesPage() {
  const issues = await db.issue.findMany();
  const openIssues = issues.filter((issue) => issue.status === "OPEN");
  return (
    <div className="maincol">
      <h1>Open Issues</h1>
      {openIssues.map((issue) => (
        <div key={issue.id}>
          <p>Title: {issue.title}</p>
          <p>Description: {issue.description}</p>
        </div>
      ))}
    </div>
  );
}
