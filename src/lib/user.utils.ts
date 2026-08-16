import userData from "@/data/wp-user.json";
import type { UserData, UserRecord } from "@/interfaces/user.interface";

const users = (userData as UserData).users;

export function getUserById(userId: string): UserRecord | null {
  return users.find((user) => user._id === userId && user.status === "active") ?? null;
}
