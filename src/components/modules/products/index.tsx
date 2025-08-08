import ProductCard from '@/components/ui/core/ProductCard'
import { IProduct } from '@/types/product'
import React from 'react'
import FilterSidbar from './filtersidebar'

const AllProducts = ({products}: {products: IProduct[]}) => {
  return (
    <div className='flex gap-8 mt-10'>
        <div>
          <FilterSidbar/>
        </div>
        
        <div>
            <div className='grid lg:grid-cols-5 md:grid-cols-2 gap-4 mt-10'>
                {products?.map((product: IProduct, idx: number) => (
                  <ProductCard key={idx} product={product} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default AllProducts