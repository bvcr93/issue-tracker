import { IssueItem } from "@/components/ui/issue-item";
import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IssueDetailsProps {
  params: {
    slug: string;
  };
}

export default async function IssueDetailsPage({
  params: { slug },
}: IssueDetailsProps) {
  try {
    // Ensure Prisma Client is generated during the build process
    await prisma.$connect();

    const issue = await prisma.issue.findUnique({
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
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  } finally {
    // Disconnect Prisma Client after fetching data
    await prisma.$disconnect();
  }
}
