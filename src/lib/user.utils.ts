import { dataSources } from "@/data-access/data-sources";
import type { UserRecord } from "@/interfaces/user.interface";

export async function getUserById(userId: string): Promise<UserRecord | null> {
  return dataSources.user.getActiveById(userId);
}
