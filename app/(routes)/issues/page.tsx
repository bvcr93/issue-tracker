// IssuesPage.tsx
import { Button } from "@/components/ui/button";
import { IssueItem } from "@/components/ui/issue-item";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function IssuesPage() {
  const issues = await db.issue.findMany();

  return (
    <div className="maincol">
      <div className="py-10">
        <Link href={"/issues/new"}>
          <Button className="mt-10">New Issue</Button>
        </Link>
      </div>
      {issues.map((issue) => (
        <div key={issue.id} className="mb-4">
          <div>
            <IssueItem {...issue} />
            <Button variant={"outline"} className="mt-5 w-full">
              See
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
