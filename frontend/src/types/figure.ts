export interface FigureCardInformation {
  id: string;
  name: string;
  imgSrc: string[];
  branch: Branch;
  description?: string;
  category: Category;
  price: number;
  salePercent?: number;
  vote: number;
  tags?: string[];
  quantity: number;
}

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

export interface CommentType {
  userID: string;
  name: string;
  vote: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export type CartItem = {
  figureId: string;
  name: string;
  image: string;
  price: number;
  maxQuantity: number;
  quantity: number;
};

export interface Category {
  id: string;
  name: string;
}
export interface Branch {
  id: string;
  name: string;
}
