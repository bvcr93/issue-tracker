"use client";

import { togleIssueStatusAction } from "@/app/actions/actions";
import Link from "next/link";
import { Button } from "./button";
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
          <Link href={`/issues/${id}`}>
            <h2 className="text-lg font-semibold mb-2 hover:text-indigo-500">
              {title}
            </h2>
          </Link>
          <p>{description}</p>
        </div>
        <div className="flex items-center gap-5">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={handleCloseIssueStatusAction}
          >
            {isClosed ? "Open issue" : "Close issue"}
          </Button>
          <Button size={"sm"} variant={"ghost"}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
