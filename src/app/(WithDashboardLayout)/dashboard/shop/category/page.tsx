import ManageCategories from '@/components/modules/shop/category'
import { getAllCategories } from '@/services/Category'
import React from 'react'

const Category = async () => {

  const {data} = await getAllCategories();

  console.log(data);

  return (
    <div>
        <ManageCategories categories={data} />
    </div>
  )
}

export default Category