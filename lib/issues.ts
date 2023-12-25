import { db } from "./db";
import { Status } from "@prisma/client";
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
export async function toggleIssueStatus(id: string) {
  try {
    const existingIssue = await db.issue.findUnique({
      where: { id },
    });

    if (!existingIssue) {
      throw new Error("Issue not found");
    }

    let newStatus = "CLOSED";
    if (existingIssue.status === "CLOSED") {
      newStatus = "OPEN";
    }
    const updatedIssue = await db.issue.update({
      where: { id },
      data: {
        status: newStatus as Status,
      },
    });

    return { issue: updatedIssue };
  } catch (error) {
    console.error(error);
  }
}

export async function editIssue(
  id: string,
  newData: { title?: string; description?: string; status?: Status }
) {
  try {
    const existingIssue = await db.issue.findUnique({
      where: { id },
    });

    if (!existingIssue) {
      throw new Error("Issue not found");
    }
    const updatedIssue = await db.issue.update({
      where: { id },
      data: {
        title: newData.title || existingIssue.title,
        description: newData.description || existingIssue.description,
        status: newData.status || existingIssue.status,
      },
    });

    return { issue: updatedIssue };
  } catch (error) {
    console.error(error);
  }
}
