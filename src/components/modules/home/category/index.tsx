import { Button } from '@/components/ui/button'
import CategoryCard from '@/components/ui/core/CategoryCard';
import NMContainer from '@/components/ui/core/NMContainer';
import { getAllCategories } from '@/services/Category'
import { ICategory } from '@/types';
import Link from 'next/link'


const Category = async () => {

  const {data: categories} = await getAllCategories();

  
  return (
    <NMContainer>
        <div className='my-20'>
          <div className='flex items-center justify-between'>
            <h2 className='font-bold md:text-2xl'>Featured Category</h2>
            <Link href={"/products"}>
              <Button variant={"outline"}>View All</Button>
            </Link>
          </div>

          <div className='flex flex-row flex-wrap gap-5 my-5'>
              {
                categories?.slice(0, 6)?.map((category: ICategory, idx: number) => <CategoryCard key={idx} category={category} />)
              }
          </div>
      </div>
    </NMContainer>
  )
}

export default Category