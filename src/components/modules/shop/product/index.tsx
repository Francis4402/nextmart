"use client";

import { NMTable } from "@/components/ui/core/NMTable/index";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IProduct } from "@/types/product";
import { IMeta } from "@/types/meta";
import { Checkbox } from "@/components/ui/checkbox";
import DiscountModel from "./DiscountModel";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import { deleteProduct } from "@/services/cart";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


const ManageProducts = ({
  products,
  meta,
}: {
  products: IProduct[];
  meta: IMeta;
}) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[] | []>([]);


  const handleView = (product: IProduct) => {
    console.log("Viewing product:", product);
  };

  const handleDelete = async (productId: string) => {
    try {
      const res = await deleteProduct(productId);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedIds((prev) => [...prev, row.original._id]);
            } else {
              setSelectedIds(
                selectedIds.filter((id) => id !== row.original._id)
              );
            }

            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category.name}</span>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: "offerPrice",
      header: "Ofter Price",
      cell: ({ row }) => (
        <span>
          $ {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : "0"}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(
                `/dashboard/shop/products/update-product/${row.original._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost"><Trash /> </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Product</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Are you sure you want to delete this product?
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant={"destructive"} onClick={() => handleDelete(row.original._id)}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/dashboard/shop/products/add-product")}
            size="sm"
          >
            Add Product <Plus />
          </Button>
          <DiscountModel
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
      </div>
      <NMTable columns={columns} data={products || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageProducts;