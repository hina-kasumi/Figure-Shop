import { FigureCardInformation } from "./figure";

export interface Order {
  id: string;
  userID: string;
  voucherID?: string | null;
  status: string;
  price: number;
  priceDiscounted: number;
  phoneNumber: string;
  address: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  figures?: OrderFigure[];
}

export interface OrderFigure {
  id: string;
  orderID: string;
  figureID: string;
  userID: string;
  quantity: number;
  price: number;
  figure: FigureCardInformation
}
