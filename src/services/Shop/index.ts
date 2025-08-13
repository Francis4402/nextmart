/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { getValidToken } from "@/lib/verifyToken";
import { cookies } from "next/headers"

export const createShop = async (data: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop`, {
            method: "POST",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value
            },
            body: data
        });
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
}

export const getMyShops = async () => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop/my-shop`, {
            method: "GET",
            headers: {
                Authorization: `${token}`
            },
        });

        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching shops:', error);
        // Return a consistent structure even on error
        return { data: [] };
    }
}