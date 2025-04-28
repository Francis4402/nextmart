import { Button } from '@/components/ui/button'
import NMContainer from '@/components/ui/core/NMContainer'
import ProductCard from '@/components/ui/core/ProductCard'
import { getAllProducts } from '@/services/Product'
import { IProduct } from '@/types/product'
import Link from 'next/link'
import React from 'react'

const FeatureProducts = async () => {

    const {data: products} = await getAllProducts();

  return (
    <div className='bg-white bg-opacity-50 py-10'>
        <NMContainer>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl'>Featured Products</h2>
                <Link href={"/products"}>
                    <Button variant={"outline"}>All Collection</Button>
                </Link>
            </div>

            <div className='grid lg:grid-cols-5 md:grid-cols-3 gap-8 my-5'>
                {
                    products?.slice(0, 5)?.map((product: IProduct, idx: number) => <ProductCard key={idx} product={product}/>)
                }
            </div>
        </NMContainer>
    </div>
  )
}

export default FeatureProducts