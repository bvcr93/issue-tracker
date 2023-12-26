"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Issue } from "@prisma/client";
import { updateIssueAction } from "../actions/actions";
export default function useEdit(initialIssue: Issue) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(initialIssue.title);
  const [editedDescription, setEditedDescription] = useState(
    initialIssue.description
  );

  const { toast } = useToast();

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setEditedTitle(initialIssue.title);
    setEditedDescription(initialIssue.description);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      await updateIssueAction(initialIssue.id, {
        title: editedTitle,
        description: editedDescription,
      });

      toast({
        title: "Issue updated successfully",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating issue:", error);
      toast({
        title: "Error updating issue",
      });
    }
  };

  return {
    isEditing,
    editedTitle,
    editedDescription,
    setEditedTitle,
    setEditedDescription,
    handleStartEditing,
    handleCancelEditing,
    handleSaveEdit,
  };
}
