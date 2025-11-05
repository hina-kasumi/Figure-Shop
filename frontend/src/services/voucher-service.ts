import apiClient from "@/libs/http";
import { Voucher, VoucherForm } from "@/types/voucher";
import { AxiosResponse } from "axios";

class VoucherService {
  async getVouchers() {
    const response = await apiClient.get("/admin/voucher");
    return response.data;
  }

  async getVoucherById(id: string) {
    const response: AxiosResponse<Voucher[]> = await apiClient.get<Voucher[]>(
      `/admin/voucher`
    );

    return response.data.find((v) => v.id === id) || {
        id: "",
        description: "",
        salePercent: 0,
        quantity: 0,
        maxPriceCanDiscount: 0,
        figuresAvalable: [],
        isActive: false,
    };
  }

  async createVoucher(data: VoucherForm) {
    const response = await apiClient.post("/admin/voucher", data);
    return response.data;
  }

  async updateVoucher(id: string, data: VoucherForm) {
    const response = await apiClient.put(`/admin/voucher/${id}`, data);
    return response.data;
  }

  async deleteVoucher(id: string) {
    await apiClient.delete(`/admin/voucher/${id}`);
  }
}

export const voucherService = new VoucherService();
