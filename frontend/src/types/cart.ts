export interface AddProductToCart {
  productId: string;
  quantity: number;
}

export interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  originalPrice: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  totalDiscount: number;
}   
