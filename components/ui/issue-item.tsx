"use client";
import { Issue } from "@prisma/client";
import { Button } from "./button";
interface IssueItemProps {
  issue: Issue | null;
}

export function IssueItem({ issue }: IssueItemProps) {
  if (!issue) {
    return <div>ahahah samo ti cekaj</div>;
  }

  return (
    <div className="w-full">
      <div
        className={`p-4 rounded flex justify-between items-center ${
          issue.status === "OPEN"
            ? "bg-green-200 text-green-800"
            : "bg-gray-200 text-gray-800"
        } shadow-md border border-gray-300 hover:bg-emerald-200 duration-300 cursor`}
      >
        <div>
          <h2 className="text-lg font-semibold mb-2">{issue.title}</h2>
          <p>{issue.description}</p>
        </div>
      </div>
    </div>
  );
}
