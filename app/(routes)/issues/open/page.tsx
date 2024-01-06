import ClosedIssueItem from "@/components/ui/closed-issue-item";
import { db } from "@/lib/db";
import { Issue } from "@prisma/client";
export default async function OpenIssuesPage() {
  const issues: Issue[] = await db.issue.findMany();
  const openIssues = issues.filter((issue) => issue.status === "OPEN");

  if (openIssues.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl">
        No closed issues to show
      </div>
    );
  }
  return (
    <div className="maincol">
      <table className="border-collapse w-full md:flex md:flex-col mt-12">
        {openIssues.map((issue) => (
          <ClosedIssueItem {...issue} key={issue.id} />
        ))}
      </table>
    </div>
  );
}
