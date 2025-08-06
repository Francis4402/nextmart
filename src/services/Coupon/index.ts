"use server"

import { getValidToken } from "@/lib/verifyToken";
import { ICoupon } from "@/types/coupon";
import { revalidateTag } from "next/cache";


export const createACoupon = async (data: ICoupon) => {

    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon`, {
            method: "POST",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        revalidateTag("COUPON");

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export const getAllCoupons = async (page?: string, limit?: string, query?: {[key: string]: string | string[] | undefined}) => {
    
    const params = new URLSearchParams();

    if (query?.discountType) {
        params.append("discountType", query?.discountType.toString());
    }

    
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon?limit=${limit}&page=${page}&${params}`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json"
            },
            next: {
                tags: ["COUPON"],
            }
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}