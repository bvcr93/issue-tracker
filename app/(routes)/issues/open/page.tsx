
import { db } from "@/lib/db";
export default async function OpenIssuesPage() {
  const issues = await db.issue.findMany();
  const openIssues = issues.filter((issue) => issue.status === "OPEN");

  

  return (
    <form className="maincol">
      <h1>Open Issues</h1>
      <table className="border flex bg-gray-100 justify-around items-center flex-col w-full">
        <thead className="flex w-full justify-around">
          <tr>
            <th className="pr-4">Title</th>
            <th className="pl-4">Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="flex justify-around w-full">
          {openIssues.map((issue) => (
            <tr key={issue.id}>
              <td>{issue.title}</td>
              <td>{issue.description}</td>             
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}
