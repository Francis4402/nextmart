import CouponTable from '@/components/modules/shop/manage-coupon/CouponTable'
import { Button } from '@/components/ui/button'
import { getAllCoupons } from '@/services/Coupon';
import Link from 'next/link'


const ManageCoupon = async ({searchParams}: {searchParams: Promise<{page: string}>}) => {
  
  const {page} = await searchParams;

  const {data, meta} = await getAllCoupons(page, "3");

  console.log(data);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Manage Coupon</h1>
        <Link href={"/dashboard/shop/manage-coupon/create-coupon"}>
          <Button variant={"default"}>Create Coupon</Button>
        </Link>
      </div>
      <div>
        <CouponTable
          coupons={data}
          meta={meta}
        />
      </div>
    </div>
  )
}

export default ManageCoupon