
import Category from "@/components/modules/home/category";
import FeatureProducts from "@/components/modules/home/featureproduct";
import FlashSale from "@/components/modules/home/flashsale";
import HeroSection from "@/components/modules/home/herosection";
import TopBrands from "@/components/modules/home/topbrands";


const HomePage = () => {

  return (
    <div>
      <HeroSection />
      <Category/>
      <FeatureProducts/>
      <FlashSale/>
      <TopBrands/>
    </div>
  );
};

export default HomePage;
