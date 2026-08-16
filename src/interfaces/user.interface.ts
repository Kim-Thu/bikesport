export interface UserRecord {
  _id: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  email?: string;
  phone?: string;
  role: string;
  status: "active" | "inactive";
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  users: UserRecord[];
}
