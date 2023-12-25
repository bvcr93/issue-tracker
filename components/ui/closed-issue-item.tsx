"use client";
import { Trash } from "lucide-react";
import { Issue, Status } from "@prisma/client";
import { deleteIssueAction } from "@/app/actions/actions";
import { toast, useToast } from "./use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClosedIssueItemProps extends Issue {}

export default function ClosedIssueItem({
  title,
  id,
  status,
  description,
}: ClosedIssueItemProps) {
  const { toast } = useToast();
  async function deleteIssue(id: string) {
    try {
      await deleteIssueAction(id);
      toast({
        title: "Issue deleted",
      });
    } catch (error) {
      toast({
        title: "Error deleting issue",
      });
      throw new Error("Error deleting issue");
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-slate-100">
        <TableRow className="">
          <TableCell className="font-medium w-72">
            {title}
          </TableCell>
          <TableCell className="overflow-hidden whitespace-nowrap truncate max-w-xs">
            {description}
          </TableCell>

          <TableCell>{status}</TableCell>
          <TableCell className="text-right flex justify-end cursor-pointer hover:text-red-500 duration-200">
            <Trash onClick={() => deleteIssue(id)} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
