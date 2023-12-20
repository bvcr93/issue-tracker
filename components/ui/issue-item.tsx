"use client";

import { togleIssueStatusAction } from "@/app/actions/actions";
import Link from "next/link";
import { Button } from "./button";
import { useToast } from "./use-toast";
import { useFormStatus } from "react-dom";
import { ReactNode } from "react";
import { useState } from "react";
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

  const handleToggleIssueStatus = async () => {
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
          <ToggleButton
            size={"sm"}
            variant={"outline"}
            onClick={handleToggleIssueStatus}
          >
            {isClosed ? "Open issue" : "Close issue"}
          </ToggleButton>
          <Button size={"sm"} variant={"ghost"}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}

type ToggleButtonProps = {
  children: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon" | null;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
  onClick?: () => Promise<void>;
};

function ToggleButton({ children, size, variant, onClick }: ToggleButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await onClick?.(); // Assuming onClick is optional
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      size={size}
      variant={variant}
      onClick={handleClick}
    >
      {loading ? "Processing..." : children}
    </Button>
  );
}
