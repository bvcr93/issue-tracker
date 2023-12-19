import { Button } from "@/components/ui/button";
import { IssueItem } from "@/components/ui/issue-item";
import { db } from "@/lib/db";
import Link from "next/link";

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
    <div className="maincol flex gap-10">
      <div className="flex flex-col w-1/2">
        <h1 className="mt-20 text-3xl">Latest issues</h1>
        <div className="flex justify-between mt-10">
          <div className="w-32 h-32 border rounded shadow-md flex items-center justify-center">
            Open ({openIssuesCount})
          </div>
          <div className="w-32 h-32 border rounded shadow-md flex items-center justify-center">
            In progress
          </div>
          <div className="w-32 h-32 border rounded shadow-md flex items-center justify-center">
            Closed ({closedIssuesCount})
          </div>
        </div>
        <div className="py-10">
          <Link href={"/issues/new"}>
            <Button>New Issue</Button>
          </Link>
        </div>
        {issues.map((issue) => (
          <div key={issue.id} className="mb-4">
            <IssueItem {...issue} />
            <Link href={`/issues/${issue.id}`}>
              {/* <Button variant={"outline"} className="mt-5 w-full">
                See
              </Button> */}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-1/2 border">asd</div>
    </div>
  );
}
