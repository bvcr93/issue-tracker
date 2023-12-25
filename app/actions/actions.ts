"use server";
import { Status } from "@prisma/client";
import {
  createIssue,
  deleteIssue,
  toggleIssueStatus,
  editIssue,
} from "@/lib/issues";
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

export async function updateIssueAction(
  id: string,
  newData: { title?: string; description?: string; status?: Status }
) {
  try {
    await editIssue(id, newData);
    revalidatePath("/issues");
  } catch (error) {
    console.error(error);
  }
}
