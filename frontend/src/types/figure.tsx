export interface FigureCardInformation {
  id: string;
  name: string;
  images: string[];
  branch: string;
  description?: string;
  category: string;
  status: string;
  price: number;
  salePercent?: number;
  rating: number;
  tags: string[];
  quantity: number;
  createdAt: string;
  updatedAt: string;
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