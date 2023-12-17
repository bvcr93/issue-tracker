import { Status } from "@prisma/client";
export interface IssueInterface {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
