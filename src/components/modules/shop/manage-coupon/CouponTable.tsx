"use client"

import { Button } from '@/components/ui/button';
import { NMTable } from '@/components/ui/core/NMTable';
import TablePagination from '@/components/ui/core/NMTable/TablePagination';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { deleteCoupons } from '@/services/Coupon';
import { ICoupon } from '@/types/coupon';
import { IMeta } from '@/types/meta'
import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';




const CouponTable = ({coupons, meta}: {coupons: ICoupon[], meta: IMeta}) => {



    const handleDelete = async (productId: string) => {
        try {
          const res = await deleteCoupons(productId);

          if (res?.success) {
            toast.success(res?.message);
          } else {
            toast.error(res?.message);
          }
        } catch (error) {
          console.log(error);
        }
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

              <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost"><Trash /> </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Coupon</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      Are you sure you want to delete this product?
                    </DialogDescription>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button variant={"destructive"} onClick={() => handleDelete(row.original._id!)}>Delete</Button>
                    </DialogFooter>
                  </DialogContent>
              </Dialog>
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