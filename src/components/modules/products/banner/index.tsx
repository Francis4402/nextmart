

const ProductBanner = ({title, path}: {title: string, path: string}) => {

  return (
    <div className='bg-[url(/home-banner.png)] bg-cover bg-center bg-no-repeat border-2 border-white rounded-3xl mt-10 flex justify-center items-center'>
      <div className='py-20 text-center'>
        <h1 className='font-bold text-2xl leading-10'>{title}</h1>
        <p>{path}</p>
      </div>
    </div>
  )
}

export default ProductBanner