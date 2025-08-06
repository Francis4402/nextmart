"use client"

import { Checkbox } from '@/components/ui/checkbox';
import { NMTable } from '@/components/ui/core/NMTable';
import TablePagination from '@/components/ui/core/NMTable/TablePagination';
import { ICoupon } from '@/types/coupon';
import { IMeta } from '@/types/meta'
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'


const CouponTable = ({coupons, meta}: {coupons: ICoupon[], meta: IMeta}) => {

    const [selectedIds, setSelectedIds] = useState<string[] | []>([]);


    const router = useRouter();

    const handleView = (coupon: ICoupon) => {
        console.log(coupon);
    }

    const handleDelete = (productId: string) => {
        console.log(productId);
    }

    const columns: ColumnDef<ICoupon>[] = [
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
                  setSelectedIds((prev) => [...prev, row.original._id!]);
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
          accessorKey: "code",
          header: "Code",
          cell: ({ row }) => <span>{row.original.code}</span>,
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
                  router.push(`/user/shop/update-product/${row.original._id}`)
                }
              >
                <Edit className="w-5 h-5" />
              </button>
    
              <button
                className="text-gray-500 hover:text-red-500"
                title="Delete"
                onClick={() => handleDelete(row.original._id!)}
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ),
        },
      ];

  return (
    <div>
        <NMTable columns={columns} data={coupons || []} />
        <TablePagination
            totalPage={meta?.totalPage}
        />
    </div>
  )
}

export default CouponTable