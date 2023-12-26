import { Issue } from "@prisma/client";
import Link from "next/link";
import { IssueItem } from "./issue-item";
interface IssuesDisplayProps {
  issues: Issue[];
}
export default function IssuesDisplay({ issues }: IssuesDisplayProps) {
  return (
    <div>
      {issues.map((issue) => (
        <Link href={`/issues/${issue.id}`}>
          <IssueItem
            title={issue.title}
            description={issue.description}
            id={issue.id}
            status={issue.status}
            createdAt={issue.createdAt}
            updatedAt={issue.updatedAt}
          />
        </Link>
      ))}
    </div>
  );
}
