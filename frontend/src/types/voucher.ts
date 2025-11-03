export interface Voucher {
    id: string;
    minPriceCanUse?: number | null;
    maxPriceCanDiscount: number;
    figuresAvalable?: string[] | null;
    description: string;
    quantity: number;
    isActive: boolean;
    salePercent: number;
    usedFrom?: string | null;
    usedTo?: string | null;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}