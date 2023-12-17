"use server";

import { createIssue, deleteIssue, closeIssueStatus } from "@/lib/issues";
import { revalidatePath } from "next/cache";

export async function createIssueAction(title: string, description: string) {
  await createIssue(title, description);
  revalidatePath("/issues");
}

export async function deleteIssueAction(id: string) {
  await deleteIssue(id);
  revalidatePath("/issues");
}
export async function closeIssueStatusAction(id: string) {
  try {
    await closeIssueStatus(id);
    revalidatePath("/issues");
  } catch (error) {
    console.log(error);
  }
}
