import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, { message: "Title must not be empty" }),
  description: z.string().min(1, { message: "Description must not be empty" }),
});

export type createIssueSchemaType = z.infer<typeof createIssueSchema>;
