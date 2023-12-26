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

export default async function AllIssyesPage() {
  const issues = await db.issue.findMany();
  return (
    <div className="maincol">
      <h1 className="my-10 text-center text-lg">List of all issues</h1>
      {issues.map((iss) => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right text-indigo-500">
                Created at
              </TableHead>
              <TableHead className="text-right text-sky-500">
                Updated at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                className={
                  iss.status === "CLOSED"
                    ? "text-green-500 font-medium"
                    : "text-red-500 font-medium"
                }
              >
                {iss.status}
              </TableCell>

              <TableCell>{iss.title}</TableCell>

              <TableCell className="w-96">
                {iss.description.split(" ").slice(0, 5).join(" ")}...
              </TableCell>
              <TableCell className="text-right w-48">
                {iss.createdAt.toLocaleString()}
              </TableCell>
              <TableCell className="text-right w-48">
                {iss.updatedAt.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  );
}
