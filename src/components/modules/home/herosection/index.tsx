import { Button } from '@/components/ui/button'
import NMContainer from '@/components/ui/core/NMContainer'
import Image from 'next/image'


const HeroSection = () => {
  return (
    <NMContainer>
        <div className='bg-[url(/home-banner.png)] bg-cover bg-center bg-no-repeat border-2 border-white rounded-3xl mt-10'>
            <div className='grid grid-cols-2 gap-4 items-center'>
                <div className='pl-12'>
                    <h1 className='lg:text-4xl text-2xl font-bold leading-normal'>Don&apos;t Miss Out on <br/> These Unbeatable Black <br/> Friday Deals!</h1>

                    <p className='my-3'>Save big this Black Friday with unbeatable deals on tech, home essentials, fashion and morer! Limited stock.</p>

                    <div className='flex gap-3 items-center'>
                        <Button>
                            Buy Now
                        </Button>
                        <Button variant={"outline"}>
                            All Products
                        </Button>
                    </div>
                </div>

                <div className='flex items-center justify-center'>
                    <Image src={"/cup-with-headphone.png"} alt='i' width={500} height={500} />
                </div>
            </div>
        </div>
    </NMContainer>
  )
}

export default HeroSection