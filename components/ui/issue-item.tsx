"use client";

import {
  closeIssueStatusAction,
  deleteIssueAction,
} from "@/app/actions/actions";
import { Button } from "./button";
import { Trash } from "lucide-react";

interface IssueItemProps {
  title: string;
  id: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export function IssueItem({ title, description, id, status }: IssueItemProps) {
  async function handleDeleteIssue() {
    await deleteIssueAction(id);
  }

  async function handleCloseIssueStatusAction() {
    await closeIssueStatusAction(id);
  }
  const statusColor = status === "CLOSED" ? "bg-red-200" : "bg-green-200";
  return (
    <div
      className={`w-full mt-5 ${statusColor}`}
      onClick={() => console.log(`Clicked on issue with ID: ${id}`)}
    >
      <div className="w-full flex justify-between px-5 items-center py-2 duration-300rounded-lg shadow-lg">
        <div>
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p>{description}</p>
        </div>
        <div className="flex items-center gap-5">
          <Trash onClick={handleDeleteIssue} className="cursor-pointer" />
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={handleCloseIssueStatusAction}
          >
            Close issue
          </Button>
        </div>
      </div>
    </div>
  );
}
