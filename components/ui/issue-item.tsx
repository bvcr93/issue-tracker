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

interface IssueItemProps {
  title: string;
  id: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export function IssueItem({ title, description, id, status }: IssueItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const { toast } = useToast();

  const isClosed = status === "CLOSED";
  const statusColor = isClosed ? "bg-red-200" : "bg-green-200";

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
    <div className={`w-full mt-5 ${statusColor}`}>
      <div className="w-full flex justify-between px-5 items-center py-2 duration-300 rounded-lg shadow-lg">
        <div>
          <Link href={`/issues/${id}`}>
            <h2 className="text-lg font-semibold mb-2 hover:text-indigo-500 mt-4 tracking-wide">
              {title}
            </h2>
          </Link>
          <p className="pr-5 py-2 text-slate-700 font-thin">{description}</p>
        </div>
        <div className="flex items-center gap-5">
          {isEditing ? (
            <Button size={"sm"} variant={"ghost"} onClick={handleSaveEdit}>
              Save
            </Button>
          ) : (
            <ToggleButton
              size={"sm"}
              variant={"outline"}
              onClick={handleToggleIssueStatus}
            >
              {isClosed ? "Open issue" : "Close issue"}
            </ToggleButton>
          )}
          <Button
            size={"sm"}
            variant={"ghost"}
            className="hover:bg-transparent"
            onClick={handleEditIssue}
          >
            {isEditing ? <X /> : <Edit />}
          </Button>
        </div>
      </div>
      {isEditing && (
        <EditArea
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          editedDescription={editedDescription}
          setEditedDescription={setEditedDescription}
        />
      )}
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
    <div className="flex flex-col gap-10 bg-slate-100 p-5">
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
function ToggleButton({ children, size, variant, onClick }: ToggleButtonProps) {
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
