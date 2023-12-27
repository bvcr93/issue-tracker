"use client";

import {
  togleIssueStatusAction,
  updateIssueAction,
} from "@/app/actions/actions";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";
import { useToast } from "./use-toast";
import { Edit, X } from "lucide-react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Status } from "@prisma/client";
import useEdit from "@/app/hooks/useEdit";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IssueItemProps {
  title: string;
  id: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export function IssueItem({
  title,
  description,
  id,
  status,
  createdAt,
}: IssueItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const { toast } = useToast();

  const isClosed = status === "CLOSED";
  const statusColor = isClosed ? "bg-green-200" : "bg-red-200";

  const handleToggleIssueStatus = async () => {
    await togleIssueStatusAction(id);
    toast({
      title: isClosed ? "Issue opened!" : "Issue closed!",
    });
  };

  const handleEditIssue = () => {
    if (isEditing) {
      setEditedTitle(title);
      setEditedDescription(description);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = async () => {
    try {
      await updateIssueAction(id, {
        title: editedTitle,
        description: editedDescription,
        status: status as Status | undefined,
      });
      toast({
        title: "Iusse updated",
      });
      setIsEditing(false);
    } catch (error) {}
  };

  return (
    <div className={`w-full bg-white rounded-lg mt-5 shadow-lg`}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line clamp-3 truncate">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Status:{" "}
            <span
              className={`${
                status === "CLOSED" ? "text-green-500" : "text-red-500"
              }`}
            >
              {" "}
              {status}
            </span>
          </p>
        </CardContent>
        <CardFooter className="flex justify-between w-full">
          <p className="font-light text-slate-600">
            Created at:{" "}
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <ToggleButton
            size={"sm"}
            onClick={handleToggleIssueStatus}
          >
            {isClosed ? "Open issue" : "Close issue"}
          </ToggleButton>
        </CardFooter>
      </Card>
    </div>
  );
}

type EditAreaProps = {
  editedTitle: string;
  setEditedTitle: React.Dispatch<React.SetStateAction<string>>;
  editedDescription: string;
  setEditedDescription: React.Dispatch<React.SetStateAction<string>>;
};

function EditArea({
  editedTitle,
  setEditedTitle,
  editedDescription,
  setEditedDescription,
}: EditAreaProps) {
  return (
    <div className="flex flex-col gap-10 bg-slate-100 p-5 h-full">
      <Input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className="w-full mt-10"
      />
      <Textarea
        className="w-full"
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
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
export function ToggleButton({
  children,
  size,
  variant,
  onClick,
}: ToggleButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await onClick?.();
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
