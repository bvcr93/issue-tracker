import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Issue } from "@prisma/client";

interface IssueDetailsProps {
  params: {
    slug: string;
  };
}
export default async function IssueDetailsPage({
  params: { slug },
}: IssueDetailsProps) {
  const issue = await db.issue.findUnique({
    where: {
      id: slug,
    },
  });

  return (
    <div className="maincol mt-10">
      <IssueItem issue={issue} />
    </div>
  );
}

interface IssueItemProps {
  issue: Issue | null;
}

function IssueItem({ issue }: IssueItemProps) {
  return (
    <div className="w-full">
      <div className="border flex flex-col shadow-md text-center md:w-1/2 mx-auto py-3">
        <h1> {issue?.title}</h1>
        <p>{issue?.description}</p>
      </div>
    </div>
  );
}
