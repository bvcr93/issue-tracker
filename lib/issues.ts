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
  } catch (error) {}
}
