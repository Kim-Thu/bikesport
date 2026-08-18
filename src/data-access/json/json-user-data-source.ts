import userData from "@/data/wp-user.json";
import type { UserDataSource } from "@/data-access/contracts/user-data-source.interface";
import type { UserData } from "@/interfaces/user.interface";

const activeUsers = (userData as UserData).users.filter((user) => user.status === "active");
const activeUserById = new Map(activeUsers.map((user) => [user._id, user]));

export const jsonUserDataSource: UserDataSource = {
  async getActiveById(userId) {
    return activeUserById.get(userId) ?? null;
  },
};
