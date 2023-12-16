"use server";

import { createIssue } from "@/lib/issues";
import { revalidatePath } from "next/cache";

export async function createIssueAction(title: string, description: string) {
  await createIssue(title, description);
  revalidatePath("/issues");
}
