"use client"

import { NMTable } from '@/components/ui/core/NMTable';
import TablePagination from '@/components/ui/core/NMTable/TablePagination';
import { ICoupon } from '@/types/coupon';
import { IMeta } from '@/types/meta'
import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';




const CouponTable = ({coupons, meta}: {coupons: ICoupon[], meta: IMeta}) => {



    const handleDelete = (productId: string) => {
        console.log(productId);
    }

    const columns: ColumnDef<ICoupon>[] = [
      
        {
          accessorKey: "code",
          header: "Code",
          cell: ({ row }) => <span>{row.original.code}</span>,
        },
        {
          accessorKey: "discountType",
          header: "DiscountType",
          cell: ({ row }) => <span>{row.original.discountType}</span>,
        },
        {
          accessorKey: "discountValue",
          header: "DiscountValue",
          cell: ({ row }) => <span>{row.original.discountValue}</span>,
        },
        {
          accessorKey: "minOrderAmount",
          header: "MinOrderAmount",
          cell: ({ row }) => <span>{row.original.minOrderAmount}</span>,
        },
        {
          accessorKey: "maxDiscountAmount",
          header: "MaxDiscountAmount",
          cell: ({ row }) => <span>{row.original.maxDiscountAmount}</span>,
        },
        {
          accessorKey: "isActive",
          header: "IsActive",
          cell: ({ row }) => <span>{row.original.isActive ? "True" : "False"}</span>,
        },
        {
          accessorKey: "startDate",
          header: "StartDate",
          cell: ({ row }) => {
              const value = row.getValue("startDate");
              
              if (!value || 
                  (typeof value !== 'string' && 
                   typeof value !== 'number' && 
                   !(value instanceof Date))) {
                  return <div className='text-left'>Not Yet Added</div>;
              }
              
              const date = new Date(value);
              
              if (isNaN(date.getTime())) {
                  return <div className='text-left'>Invalid Date</div>;
              }
              
              const options: Intl.DateTimeFormatOptions = { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
              };
              const formattedDate = date.toLocaleDateString(undefined, options);
              return <div className='text-left'>{formattedDate}</div>;
          }
        },
        {
          accessorKey: "endDate",
          header: "EndDate",
          cell: ({ row }) => {
              const value = row.getValue("endDate");
              
              if (!value || 
                  (typeof value !== 'string' && 
                   typeof value !== 'number' && 
                   !(value instanceof Date))) {
                  return <div className='text-left'>Not Yet Added</div>;
              }
              
              const date = new Date(value);
              
              if (isNaN(date.getTime())) {
                  return <div className='text-left'>Invalid Date</div>;
              }
              
              const options: Intl.DateTimeFormatOptions = { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
              };
              const formattedDate = date.toLocaleDateString(undefined, options);
              return <div className='text-left'>{formattedDate}</div>;
          }
        },
        {
          accessorKey: "action",
          header: "Action",
          cell: ({ row }) => (
            <div className="flex items-center space-x-3">
    
    
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