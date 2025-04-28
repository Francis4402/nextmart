import { z } from "zod";

export const createShopSchema = z.object({
    shopName: z.string().min(1, "Shop name is required."),
    businessLicenseNumber: z.string().min(1, "Business license number is required."),
    address: z.string().min(1, "Address is required."),
    contactNumber: z.string().min(1, "Contact number is required."),
    website: z.string().url().nullable().optional(),
    servicesOffered: z.string().min(1, "At least one service must be offered."),
    establishedYear: z.string(),
    taxIdentificationNumber: z.string().min(1, "Tax identification number is required.")
})