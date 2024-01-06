import BarChart from "@/components/ui/bar-chart";
import { Button } from "@/components/ui/button";
import { IssueItem } from "@/components/ui/issue-item";
import { db } from "@/lib/db";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default async function IssuesPage() {
  const issues = await db.issue.findMany();
  let openIssuesCount = 0;
  let closedIssuesCount = 0;

  issues.forEach((issue) => {
    if (issue.status === "OPEN") {
      openIssuesCount++;
    } else if (issue.status === "CLOSED") {
      closedIssuesCount++;
    }
  });
  return (
    <div className="maincol gap-20 w-full min-h-screen">
      <div className="flex justify-between">
        <div className="w-full md:flex mt-10 grid grid-cols-1 gap-5">
          <Link
            href={"/issues/open"}
            className="md:w-1/3 rounded-lg bg-white shadow-lg h-24 flex items-center justify-center"
          >
            <span className="mr-2">Open Issues</span>{" "}
            <span>({openIssuesCount})</span>
          </Link>
          <Link
            href={"/issues/closed"}
            className="md:w-1/3 rounded-lg bg-white shadow-lg h-24 flex items-center justify-center"
          >
            <span className="mr-2">Closed Issues</span>{" "}
            <span>({closedIssuesCount})</span>
          </Link>
          <div className="md:w-1/3 h-24 flex items-center justify-center">
            <Link href={"/issues/new"}>
              <Button className="w-full md:w-48">
                Create New Issue <ArrowBigRight className="ml-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2  grid-cols-1 gap-10 mt-10">
        {issues.map((issue) => (
          <IssueItem {...issue} />
        ))}
      </div>
      <div className="flex-col mt-32 flex">
        <BarChart issues={issues} indexAxis="y" />
      </div>
    </div>
  );
}
