import { Branch, Category } from "@/types/figure";

export function nameOfBranch(branches: Branch[], id: string): string {
  const branch = branches.find((b) => b.id === id);  
  return branch ? branch.name : "";
}

export function nameOfCategory(categories: Category[], id: string): string {
  const branch = categories.find((c) => c.id === id);
  return branch ? branch.name : "";
}
