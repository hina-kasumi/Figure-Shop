import apiClient from "@/libs/http";
import { OrderResponse, OrderStatus } from "@/types/order";
import { AxiosResponse } from "axios";

class OrderService {
  async fetchOrders(
    userEmail?: string,
    orderStatus?: OrderStatus
  ): Promise<OrderResponse[]> {
    const params: Record<string, string> = {};

    if (userEmail) {
      params["UserEmail"] = userEmail;
    }
    if (orderStatus) {
      params["OrderStatus"] = orderStatus;
    }

    const response: AxiosResponse<OrderResponse[]> = await apiClient.get<
      OrderResponse[]
    >("/admin/orders/search", { params });

    return response.data;
  }

  async updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus
  ): Promise<void> {
    let status: number;
    switch (newStatus) {
        case OrderStatus.Pending:
            status = 0;
            break;
        case OrderStatus.Processing:
            status = 1;
            break;
        case OrderStatus.Shipping:
            status = 2;
            break;
        case OrderStatus.Completed:
            status = 3;
            break;
        case OrderStatus.Cancelled:
            status = 4;
            break;
        default:
            throw new Error("Invalid order status");
    }
    
    await apiClient.patch(`/admin/orders/${orderId}/status`, {
      newStatus: status,
    });
  }
}

export const orderService = new OrderService();
