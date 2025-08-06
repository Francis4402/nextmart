

export interface ICoupon {
    _id?: string;
    code?: string;
    discountType?: "Flat" | "Percentage";
    discountValue?: number;
    minOrderAmount?: number;
    maxDiscountAmount?: number | null;
    startDate?: string;
    endDate?: string;
}