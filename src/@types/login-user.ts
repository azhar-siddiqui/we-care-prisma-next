import { Admin, User } from "@/generated/prisma";

export type LoggedInAdminUser = Pick<
  Admin,
  "id" | "email" | "labName" | "ownerName" | "role" | "isBlock" | "isTrialUsed"
>;

export type LoggedInUser = Pick<User, "id" | "username" | "name" | "role">;
