import UpdateProductForm from '@/components/modules/shop/product/UpdateProductForm';
import { getSingleProduct } from '@/services/Product';


const UpdateProduct = async ({params}: {params: Promise<{productId: string}>}) => {

  const {productId} = await params;

  const {data: product} = await getSingleProduct(productId);

  
  return (
    <div className='flex justify-center items-center'>
      <UpdateProductForm product={product} />
    </div>
  )
}

export default UpdateProduct
