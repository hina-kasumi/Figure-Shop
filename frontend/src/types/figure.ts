export interface FigureDetailResponse {
  id: string;
  name: string;
  imgSrc: string[];
  branchId: string;
  categoryId: string;
  price: number;
  salePercent?: number;
  quantity: number;
  description: string;
  vote: number;
  branch: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  comments?: CommentType[];
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface FigureForm {
  id?: string;
  name: string;
  imgSrc: string[];
  branchId: string;
  categoryId: string;
  price: number;
  salePercent?: number;
  quantity: number;
  description: string;
}

export interface CreateFigureForm {
  name: string;
  images: FileList | null;
  branchId: string;
  categoryId: string;
  price: number;
  salePercent?: number;
  quantity: number;
  description: string;
}

export interface CommentType {
  id: string;
  vote: number;
  content: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
  };
}

export interface Category {
  id: string;
  name: string;
}
export interface Branch {
  id: string;
  name: string;
}
