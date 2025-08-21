import { z } from "zod";


export const verifyTokenSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    otp: z.string().min(4).max(4, {
        message: "Please enter a valid OTP"
    })
});

export type VerifyTokenSchema = z.infer<typeof verifyTokenSchema>;