
import { z } from "zod";

export const resetPassSchema = z.object({
    newPassword: z.string(),
});

export type ResetPassSchema = z.infer<typeof resetPassSchema>;