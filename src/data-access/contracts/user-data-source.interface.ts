import type { UserRecord } from "@/interfaces/user.interface";

export interface UserDataSource {
  getActiveById(userId: string): Promise<UserRecord | null>;
}
