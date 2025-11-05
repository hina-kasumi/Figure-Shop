import { FigureDetailResponse } from "./figure";

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
  figure: FigureDetailResponse;
}

export interface OrderResponse {
  id: string;
  user: {
    id: string;
    email: string;
  };
  status: string;
  totalPrice: number;
  paidPrice: number;
  orderDate: string;
  deliveryDate: string;
  phoneNumber: string;
  address: string;
  orderFigures: {
    orderId: string;
    figureId: string;
    price: number;
    quantity: number;
  }[];
}

export enum OrderStatus {
  Pending = "Pending",
  Processing = "Processing",
  Shipping = "Shipping",
  Completed = "Completed",
  Cancelled = "Cancelled"
}
