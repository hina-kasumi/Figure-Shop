import apiClient from "@/libs/http";
import { Cart } from "@/types/cart";

class CartService {
  async addItemToCart(productId: string, quantity: number): Promise<void> {
    const response = await apiClient.post("/api/cart/items", {
      productId,
      quantity,
    });
    return response.data;
  }
  async getCart(): Promise<Cart> {
    const response = await apiClient.get("/api/cart");
    return response.data;
  }
  async removeItemFromCart(productId: string): Promise<void> {
    const response = await apiClient.delete(`/api/cart/items/${productId}`);
    return response.data;
  }
    async updateItemQuantity(productId: string, quantity: number): Promise<void> {
    const response = await apiClient.put(`/api/cart/items/${productId}`, {
      quantity,
    });
    return response.data;
  }
}

export const cartService = new CartService();
