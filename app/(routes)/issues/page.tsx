import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
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
            <div
              className={`p-4 rounded ${
                issue.status === "OPEN"
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-200 text-gray-800"
              } shadow-md border border-gray-300 hover:bg-emerald-200 duration-300 cursor`}
            >
              <h2 className="text-lg font-semibold mb-2">{issue.title}</h2>
              <p>{issue.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
