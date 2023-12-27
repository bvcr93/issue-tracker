import SearchSection from "@/components/search-section";
import IssueTable from "@/components/ui/issue-table";
import { db } from "@/lib/db";

export default async function AllIssyesPage() {
  const issues = await db.issue.findMany();
  return (
    <div className="maincol">
      <h1 className="my-10 text-center text-lg">List of all issues</h1>{" "}
      <SearchSection issues={issues} />
    </div>
  );
}
