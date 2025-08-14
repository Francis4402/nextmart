"use client"

import ManageShop from '@/components/modules/shop/myshop';
import { getMyShops } from '@/services/Shop';
import { IShop } from '@/types/shop';
import { useEffect, useState } from 'react';


const MyShop = () => {
  const [shopData, setShopData] = useState<IShop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await getMyShops();
        
        const shops = response?.data ? 
          (Array.isArray(response.data) ? response.data : [response.data]) : 
          [];
        
        setShopData(shops);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []);
    
  return (
    <div>
      <ManageShop shop={shopData} />
    </div>
  );
}

export default MyShop