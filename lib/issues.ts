import { db } from "./db";

export async function getIssues() {
  try {
    const issues = await db.issue.findMany();
    return { issues };
  } catch (error) {
    console.log(error);
  }
}

export async function createIssue(title: string, description: string) {
  try {
    const issue = await db.issue.create({
      data: {
        title,
        description,
      },
    });
    return { issue };
  } catch (error) {
    console.log(error);
  }
}

export async function deleteIssue(id: string) {
  const existingIssue = await db.issue.findUnique({
    where: { id },
  });
  if (!existingIssue) {
    throw new Error("Issue not found!");
  }
  try {
    const issue = await db.issue.delete({
      where: { id },
    });
    return { issue };
  } catch (error) {
    console.log(error);
  }
}
