import { Button } from "@/components/ui/button";
import { IssueItem } from "@/components/ui/issue-item";
import { db } from "@/lib/db";
import Link from "next/link";
import BarChart from "@/components/ui/bar-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="maincol md:flex gap-20 w-full">
      <div className="flex flex-col md:w-1/2">
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
        <div className="py-10 flex gap-5">
          <Link href={"/issues/new"}>
            <Button>New Issue</Button>
          </Link>
          <Link href={"/issues/all"}>
            <Button>See All</Button>
          </Link>
        </div>
        <h1 className="py-5 text-xl font-light text-slate-700">
          Latest issues
        </h1>
        {issues.slice(0, 3).map((issue) => (
          <div key={issue.id} className="mb-4 md:mt-2">
            <IssueItem {...issue} />
            <Link href={`/issues/${issue.id}`}>
              {/* <Button variant={"outline"} className="mt-5 w-full">
                See
              </Button> */}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex-col w-1/2 mt-32 hidden md:flex">
        <BarChart issues={issues} indexAxis="y" />
        {/* <div className="flex flex-col gap-10 mt-20">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div> */}
      </div>
    </div>
  );
}
