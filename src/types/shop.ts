export interface IUser {
    _id: string;
    name: string;
    email: string;
    role?: string;
}

export interface IShop {
    shopName: string;
    businessLicenseNumber: string;
    address: string;
    contactNumber: string;
    website?: string;
    user?: IUser | string; // Can be either a populated user object or a string ID
    servicesOffered: string[];
    ratings?: number;
    establishedYear: number;
    socialMediaLinks?: Map<string, string>;
    taxIdentificationNumber: string;
    logo?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}