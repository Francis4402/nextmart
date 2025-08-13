"use client"


import { NMTable } from "@/components/ui/core/NMTable";
import { IShop } from "@/types/shop";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";



const ManageShop = ({
    shop,
  }: {
    shop: IShop[];
  }) => {
  
    
    const shopData = Array.isArray(shop) ? shop : [];

    const columns: ColumnDef<IShop>[] = [
      {
        accessorKey: "logo",
        header: "Shop Logo",
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            {row.original.logo ? (
              <>
                <Image
                  src={row.original.logo}
                  alt={"i"}
                  width={40}
                  height={40}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </>
            ) : (
              <span className="text-gray-400">No logo</span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "shopName",
        header: "Shop Name",
        cell: ({ row }) => <span>{row.original.shopName}</span>,
      },
      {
        accessorKey: "businessLicenseNumber",
        header: "Bussiness License Number",
        cell: ({ row }) => <span>{row.original.businessLicenseNumber}</span>,
      },
      {
        accessorKey: "taxIdentificationNumber",
        header: "Text Identification Number",
        cell: ({ row }) => <span>{row.original.taxIdentificationNumber}</span>,
      },
      {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => <span>{row.original.address}</span>,
      },
      {
        accessorKey: "contactNumber",
        header: "Contact Number",
        cell: ({ row }) => (
          <span>
            {row.original.contactNumber}
          </span>
        ),
      },
      {
        accessorKey: "website",
        header: "Website",
        cell: ({ row }) => (
          <span>
            {row.original.website}
          </span>
        ),
      },
      {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.original.user;
            let displayName = '';
            
            if (typeof user === 'string') {
              displayName = user;
            } else if (user && typeof user === 'object') {
              // Handle populated user object
              displayName = user.name
            }
            
            return (
              <span>
                {displayName}
              </span>
            );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const user = row.original.user;
            let displayName = '';
            
            if (typeof user === 'string') {
              displayName = user;
            } else if (user && typeof user === 'object') {
              // Handle populated user object
              displayName = user.email
            }
            
            return (
              <span>
                {displayName}
              </span>
            );
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const user = row.original.user;
            let displayName = '';
            
            if (typeof user === 'string') {
              displayName = user;
            } else if (user && typeof user === 'object') {
              // Handle populated user object
              displayName = user.role || ''
            }
            
            return (
              <span>
                {displayName}
              </span>
            );
        },
      },
      {
        accessorKey: "ratings",
        header: "Ratings",
        cell: ({ row }) => (
          <span>
            {row.original.ratings}
          </span>
        ),
      },
      {
        accessorKey: "establishedYear",
        header: "Established Year",
        cell: ({ row }) => (
          <span>
            {row.original.establishedYear}
          </span>
        ),
      },
      {
        accessorKey: "isActive",
        header: "Is Active",
        cell: ({ row }) => (
          <span>
            {row.original.isActive ? 'Yes' : 'No'}

          </span>
        ),
      },
    ];
  
    return (
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Manage Shop</h1>
        </div>
        {shopData.length > 0 ? (
          <NMTable columns={columns} data={shopData} />
        ) : (
          <div className="mt-5 p-4 border rounded-md text-center">
            <p>No shop data available.</p>
          </div>
        )}
      </div>
    );
  };
  
  export default ManageShop;