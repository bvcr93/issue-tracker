"use client";
import { Status } from "@prisma/client";
import { Textarea } from "./textarea";
import { Button } from "./button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import {
  deleteIssueAction,
  updateIssueAction,
  togleIssueStatusAction,
} from "@/app/actions/actions";
import { format } from "date-fns";
import { useState } from "react";
import { useToast } from "./use-toast";
import { Input } from "./input";
import { ToggleButton } from "./issue-item";
interface IssueTableProps {
  description: string;
  status: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
export default function IssueTable({
  description,
  status,
  title,
  createdAt,
  updatedAt,
  id,
}: IssueTableProps) {
  async function deleteIssue(id: string) {
    try {
      await deleteIssueAction(id);
      toast({ title: "Issue deleted" });
    } catch (error) {}
  }

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
    <>
      <Table className="z-0">
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
            <TableHead className="text-right w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              className={
                status === "CLOSED"
                  ? "text-green-500 font-medium"
                  : "text-red-500 font-medium"
              }
            >
              {status}
            </TableCell>

            <TableCell>{title}</TableCell>

            <TableCell className="w-96">
              {description.split(" ").slice(0, 5).join(" ")}...
            </TableCell>
            <TableCell className="text-right w-48">
              {format(createdAt, "MM/dd/yyyy HH:mm")}
            </TableCell>
            <TableCell className="text-right w-48">
              {format(updatedAt, "MM/dd/yyyy HH:mm")}
            </TableCell>
            <TableCell className="text-right w-16">
              <button
                onClick={() => deleteIssue(id)}
                className="text-red-500 mx-1 hover:text-red-700"
              >
                <Trash />
              </button>
              <button className="text-indigo-500 mx-1 hover:text-indigo-700">
                <Edit onClick={handleEditIssue} />
              </button>
              <ToggleButton
                size={"sm"}
                variant={"outline"}
                onClick={handleToggleIssueStatus}
              >
                {isClosed ? "Open issue" : "Close issue"}
              </ToggleButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {isEditing && (
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
          <div className="flex justify-end mt-4">
            <Button size={"sm"} onClick={handleSaveEdit}>
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
