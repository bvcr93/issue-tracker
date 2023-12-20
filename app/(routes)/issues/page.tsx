import { Button } from "@/components/ui/button";
import { IssueItem } from "@/components/ui/issue-item";
import { db } from "@/lib/db";
import Link from "next/link";
import BarChart from "@/components/bar-chart";
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
    <div className="maincol md:flex gap-10 grid g">
      <div className="flex flex-col w-1/2">
        <h1 className="mt-20 text-3xl">Latest issues</h1>
        <div className="flex mt-10 gap-5">
          <Link
            href={"/issues/open"}
            className="w-full h-32 border rounded shadow-md flex items-center justify-center hover:shadow-lg duration-300"
          >
            Open ({openIssuesCount})
          </Link>
          <Link
            href={"/issues/closed"}
            className="w-full h-32 border rounded shadow-md flex items-center justify-center hover:shadow-lg duration-300"
          >
            <div>Closed ({closedIssuesCount})</div>
          </Link>
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
      <div className="flex flex-col w-1/2 border mt-32">
        <BarChart issues={issues} indexAxis="y" />
      </div>
    </div>
  );
}
