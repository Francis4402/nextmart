export interface ICategory {
    _id: string;
    name: string;
    description: string;
    icon: string;
    parent: string | null;
    isActive: boolean;
    createdBy: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    children: ICategory[];
}