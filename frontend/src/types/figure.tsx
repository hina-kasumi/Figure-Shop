export interface FigureCardInformation {
  id: number;
  name: string;
  image: string;
  status: string;
  price: number;
  salePercent?: number;
  rating: number;
  tags: string[];
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
