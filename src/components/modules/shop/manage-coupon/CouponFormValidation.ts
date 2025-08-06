import { z } from "zod";


export const validateCouponForm = z.object({
    code: z.string().trim().toUpperCase().optional(),
    discountType: z.enum(['Flat', 'Percentage']).optional(),
    discountValue: z.number().min(0).optional(),
    minOrderAmount: z.number().min(0).optional(),
    maxDiscountAmount: z.number().nullable().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

export type CouponForm = z.infer<typeof validateCouponForm>;