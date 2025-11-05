import { voucherService } from "@/services/voucher-service";
import { Voucher, VoucherForm } from "@/types/voucher";
import { useEffect, useState } from "react";

export function useVouchers() {
  const [loading, setLoading] = useState<boolean>(false);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    voucherService
      .getVouchers()
      .then((data: Voucher[]) => {
        setVouchers(data);
      })
      .catch(() => {
        setError(new Error("Failed to fetch vouchers"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data: vouchers,
    isLoading: loading,
    error: error,
  };
}

export function useVoucher(id: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    if (id) {
      setLoading(true);
      voucherService
        .getVoucherById(id)
        .then((data: Voucher) => {
          setVoucher(data);
        })
        .catch(() => {
          setError(new Error("Failed to fetch voucher"));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return {
    data: voucher,
    isLoading: loading,
    error: error,
  };
}

export function useCreateVoucher() {
  const [loading, setLoading] = useState<boolean>(false);
  async function createVoucher(form: VoucherForm) {
    setLoading(true);
    try {
      const data = await voucherService.createVoucher(form);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    createVoucher,
    isLoading: loading,
  };
}

export function useUpdateVoucher() {
  const [loading, setLoading] = useState<boolean>(false);
  async function updateVoucher(id: string, form: VoucherForm) {
    setLoading(true);
    try {
      const data = await voucherService.updateVoucher(id, form);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    updateVoucher,
    isLoading: loading,
  };
}

export function useDeleteVoucher() {
  const [loading, setLoading] = useState<boolean>(false);
  async function deleteVoucher(id: string) {
    setLoading(true);
    try {
      await voucherService.deleteVoucher(id);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteVoucher,
    isLoading: loading,
  };
}
