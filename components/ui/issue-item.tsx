"use client";

import {
  togleIssueStatusAction,
  deleteIssueAction,
} from "@/app/actions/actions";
import { Button } from "./button";
import { Trash } from "lucide-react";
import { useToast } from "./use-toast";

interface IssueItemProps {
  title: string;
  id: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export function IssueItem({ title, description, id, status }: IssueItemProps) {
  const { toast } = useToast();

  const isClosed = status === "CLOSED";
  const statusColor = isClosed ? "bg-red-200" : "bg-green-200";

  const handleDeleteIssue = async () => {
    await deleteIssueAction(id);
  };

  const handleCloseIssueStatusAction = async () => {
    await togleIssueStatusAction(id);
    toast({
      title: isClosed ? "Issue opened!" : "Issue closed!",
    });
  };

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
            {isClosed ? "Open issue" : "Close issue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
