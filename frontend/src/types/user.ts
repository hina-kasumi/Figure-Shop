export interface UserItem {
  id: string;
  email: string;
  status: number;
  roles: { name: string }[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export enum UserRole {
  ADMIN = "Admin",
  USER = "USER",
}
