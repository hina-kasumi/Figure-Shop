import { UserItem, UserRole } from "@/types/user";

export function isBanned(user: UserItem): boolean {
  return user.status === 3;
}
export function isAdmin(user: UserItem): boolean {
  return user.roles.filter((r) => r.name === UserRole.ADMIN).length > 0;
}
