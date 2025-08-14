import NMContainer from '@/components/ui/core/NMContainer'
import React from 'react'
import CountDown from './CountDown'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getFlashSaleProducts } from '@/services/FlashSale'
import { IProduct } from '@/types/product'
import ProductCard from '@/components/ui/core/ProductCard'

const FlashSale = async () => {

  const {data: products} = await getFlashSaleProducts();

  return (
    <div className=" bg-white bg-opacity-50 pt-6 pb-8">
      {
        products?.length > 0 && (
          <NMContainer className="my-16">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-8">
                <h2 className="text-3xl font-bold">Flash Sale</h2>
                <CountDown />
              </div>

              <Link href="/products">
                <Button variant="outline" className="rounded-full">
                  All Collection
                </Button>
              </Link>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 mt-10">
              {products?.slice(0, 4)?.map((product: IProduct, idx: number) => (
                <ProductCard key={idx} product={product} />
              ))}
            </div>
          </NMContainer>
        )
      }
    </div>
  )
}

export default FlashSale