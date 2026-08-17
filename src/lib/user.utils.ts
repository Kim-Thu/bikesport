import userData from "@/data/wp-user.json";
import type { UserData, UserRecord } from "@/interfaces/user.interface";

const activeUserById = new Map(
  (userData as UserData).users
    .filter((user) => user.status === "active")
    .map((user) => [user._id, user]),
);

export function getUserById(userId: string): UserRecord | null {
  return activeUserById.get(userId) ?? null;
}
