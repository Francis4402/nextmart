"use client"

import { useUser } from '@/context/UserContext';
import Image from 'next/image';


const Profile = () => {
  const {user} = useUser();

  console.log(user);
  return (
    <div className='grid md:grid-cols-2 gap-5'>
        <div>
          <Image src={"https://github.com/shadcn.png"} alt="avatar" width={200} height={200} />

          
        </div>
    </div>
  )
}

export default Profile