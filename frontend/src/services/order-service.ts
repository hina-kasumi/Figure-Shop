import apiClient from "@/libs/http";
import { OrderOfUserDetailResponse, OrderOfUserItem, OrderResponse, OrderStatus } from "@/types/order";
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

  async addNewOrder(
    cartItemIds: string[],
    address: string,
    phoneNumber: string,
    voucherId?: string | null
  ): Promise<void> {
    await apiClient.post("/api/orders", {
      cartItemIds,
      address,
      phoneNumber,
      voucherId,
      paymentMethod: "COD",
    });
  }

  async getOrdersOfUser() {
    const response: AxiosResponse<OrderOfUserItem[]> = await apiClient.get<
      OrderOfUserItem[]
    >("/api/orders");
    return response.data;
  }

  async getOrderDetails(orderId: string) {
    const response: AxiosResponse<OrderOfUserDetailResponse> = await apiClient.get<
      OrderOfUserDetailResponse
    >(`/api/orders/${orderId}`);
    return response.data;
  }
}

export const orderService = new OrderService();
