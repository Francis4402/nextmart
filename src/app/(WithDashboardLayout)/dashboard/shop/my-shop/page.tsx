import ManageShop from '@/components/modules/shop/myshop';
import { getMyShops } from '@/services/Shop';


const MyShop = async () => {
  try {
    const response = await getMyShops();
    
    let shopData;
    
    if (response?.data) {

      if (Array.isArray(response.data)) {
        shopData = response.data;
      } else {
        shopData = [response.data];
      }
    } else {
      shopData = [];
    }
    
    return (
      <div>
        <ManageShop shop={shopData} />
      </div>
    );
  } catch (error) {
    console.error('Error in MyShop component:', error);
    return (
      <div>
        <div className="p-4 border rounded-md text-center text-red-500">
          <p>Error loading shop data. Please try again later.</p>
        </div>
      </div>
    );
  }
}

export default MyShop