import BarChart from "@/components/ui/bar-chart";
import { IssueItem } from "@/components/ui/issue-item";
import { db } from "@/lib/db";

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
        <div className="border w-full flex justify-around items-center">
          <div className="w-48 h-48 border">Closed</div>
          <div className="w-48 h-48 border">Open</div>
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
