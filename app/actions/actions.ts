"use server";

import { createIssue, deleteIssue, toggleIssueStatus } from "@/lib/issues";
import { revalidatePath } from "next/cache";

export async function createIssueAction(title: string, description: string) {
  await createIssue(title, description);
  revalidatePath("/issues");
}

export async function deleteIssueAction(id: string) {
  await deleteIssue(id);
  revalidatePath("/issues");
}
export async function togleIssueStatusAction(id: string) {
  try {
    await toggleIssueStatus(id);
    revalidatePath("/issues");
  } catch (error) {
    console.log(error);
  }
}
