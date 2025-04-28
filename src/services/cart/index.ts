/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { getValidToken } from "@/lib/verifyToken";
import { IOrder } from "@/types/cart";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const getAllProducts = async (page?: string, limit?: string, query?: {[key: string]: string | string[] | undefined}) => {
    const params = new URLSearchParams();

    if (query?.price) {
        params.append("minPrice", "0");
        params.append("maxPrice", query?.price.toString());
    }

    if (query?.category) {
        params.append("categories", query?.category.toString());
    }

    if (query?.brand) {
        params.append("brands", query?.brand.toString());
    }

    if (query?.rating) {
        params.append("ratings", query?.rating.toString());
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/product?limit=${limit}&page=${page}&${params}`,
            {
                next: {
                    tags: ["PRODUCT"],
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
}


export const getSingleProduct = async (productId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
            {
                next: {
                    tags: ["PRODUCT"],
                },
            }
        );

        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
}

export const addProduct = async (productData: FormData): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
            method: "POST",
            body: productData,
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
        });

        revalidateTag("PRODUCT");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
}

export const updateProduct = async (productData: FormData, productId: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`, {
            method: "PATCH",
            body: productData,
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            }
        });

        revalidateTag("PRODUCT");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
}

export const deleteProduct = async (productId: string): Promise<any> => {

    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`, {
            method: "DELETE",
            headers: {
                Authorization: token
            }
        });

        revalidateTag("PRODUCT");

        return res.json();
    } catch (error: any) {
        return Error(error);
    }
}

export const createOrder = async (order: IOrder) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
  
      return await res.json();
    } catch (error: any) {
      return Error(error);
    }
};

export const addCoupon = async ({shopId, subTotal, couponCode} : {shopId: string; subTotal: number; couponCode: string}) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
  
      return await res.json();
    } catch (error: any) {
      return Error(error);
    }
};