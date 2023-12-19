import { IssueItem } from "@/components/ui/issue-item";
import { db } from "@/lib/db";

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

  if (!issue) {
    return <div>Issue not found</div>;
  }

  return (
    <div className="maincol mt-10">
      <IssueItem {...issue} />
    </div>
  );
}
