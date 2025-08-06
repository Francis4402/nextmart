"use client"

import CartProductCard from './CartProductCard';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hooks';
import { CartProduct, orderedProductsSelector } from '@/redux/features/cartSlice';

const CartProducts = () => {

    const products = useAppSelector(orderedProductsSelector);

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md lg:col-span-8 h-full lg:row-span-3 p-10 space-y-5">
      {products.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-2">
            Looks like your cart is on vacation—bring it back to work by adding
            some items!
          </p>
          <div className="flex justify-center items-center ">
            <Image src={"/empty-cart.png"} alt="empty cart" width={100} height={100} />
          </div>
        </div>
      )}
      {products.map((product: CartProduct) => (
        <CartProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default CartProducts