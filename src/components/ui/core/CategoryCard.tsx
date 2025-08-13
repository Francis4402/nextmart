import { ICategory } from "@/types";
import Image from "next/image";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div className="bg-white bg-opacity-50 border-2 border-white rounded-2xl text-center p-6 w-fit h-fit">
      <div className="w-8 h-8 mx-auto">
        <Image
          src={category?.icon}
          width={100}
          height={100}
          alt="category icon"
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-sm font-semibold truncate mt-3">{category?.name}</h3>
    </div>
  );
};

export default CategoryCard;