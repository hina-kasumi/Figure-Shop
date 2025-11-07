import { orderService } from "@/services/order-service";
import { OrderOfUserItem, OrderResponse, OrderStatus } from "@/types/order";
import { useEffect, useState } from "react";

export function useOrders(userEmail?: string, orderStatus?: OrderStatus) {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [reloadFlag, setReloadFlag] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    orderService
      .fetchOrders(userEmail, orderStatus)
      .then((data) => setOrders(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [userEmail, orderStatus, reloadFlag]);

  function reload() {
    setReloadFlag((prev) => prev + 1);
  }

  return { orders, reload, loading, error };
}

export function useUpdateOrderStatus() {
  const [loading, setLoading] = useState<boolean>(false);

  async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    setLoading(true);
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }
  return { updateOrderStatus, loading };
}

export function useAddNewOrder() {
  const [loading, setLoading] = useState<boolean>(false);

  async function addNewOrder(
    cartItemIds: string[],
    address: string,
    phoneNumber: string,
    voucherId?: string | null
  ) {
    setLoading(true);
    try {
      await orderService.addNewOrder(
        cartItemIds,
        address,
        phoneNumber,
        voucherId
      );
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { addNewOrder, loading };
}

export function useUserOrders() {
  const [orders, setOrders] = useState<OrderOfUserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [reloadFlag, setReloadFlag] = useState<number>(0);
  useEffect(() => {
    setLoading(true);
    setError(null);
    orderService
      .getOrdersOfUser()
      .then((data) => setOrders(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [reloadFlag]);

  function reload() {
    setReloadFlag((prev) => prev + 1);
  }

  async function getUserOrderById(orderId: string) {
    setLoading(true);
    setError(null);
    try {
      const order = await orderService.getOrderDetails(orderId);
      return order;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }
  return { orders, reload, getUserOrderById, loading, error };
}