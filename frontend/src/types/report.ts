export interface UserReport {
  id: string;
  email: string;
  status: number;
  totalSpent: number;
  totalItemsPurchased: number;
}

export interface FigureReport {
  figureId: string;
  figureName: string;
  totalQuantitySold: number;
}
