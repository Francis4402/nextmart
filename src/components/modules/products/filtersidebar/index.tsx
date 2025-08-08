"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { getAllBrands } from "@/services/Brand";
import { getAllCategories } from "@/services/Category";
import { Star } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";

const FilterSidbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialPrice = searchParams.get('price') ? 
        parseInt(searchParams.get('price') as string) : 0;
    
    const [sliderValue, setSliderValue] = useState(initialPrice);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    
    // Track selected values for each filter group
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        searchParams.get('category') || null
    );
    const [selectedBrand, setSelectedBrand] = useState<string | null>(
        searchParams.get('brand') || null
    );
    const [selectedRating, setSelectedRating] = useState<string | null>(
        searchParams.get('rating') || null
    );

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [{ data: categoriesData }, { data: brandsData }] =
                    await Promise.all([getAllCategories(), getAllBrands()]);
                setCategories(categoriesData);
                setBrands(brandsData);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch filters");
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const urlPrice = searchParams.get('price');
        if (urlPrice) {
            const priceValue = parseInt(urlPrice);
            if (!isNaN(priceValue)) {
                setSliderValue(priceValue);
            }
        } else {
            setSliderValue(0);
        }
        
        
        setSelectedCategory(searchParams.get('category'));
        setSelectedBrand(searchParams.get('brand'));
        setSelectedRating(searchParams.get('rating'));
    }, [searchParams]);

    const handleSearchQuery = (query: string, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString());
    
        params.set(query, value.toString());
    
        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setSliderValue(Math.min(Math.max(value, 0), 500000));
    };

    const applyPriceFilter = () => {
        handleSearchQuery("price", sliderValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            applyPriceFilter();
        }
    };

    const clearAllFilters = () => {
        router.push(`${pathname}`, {
            scroll: false,
        });
        setSliderValue(0);
        setSelectedCategory(null);
        setSelectedBrand(null);
        setSelectedRating(null);
    };

    return (
        <Card className="p-4 rounded-2xl shadow-md w-72">
            <CardContent>
                <h2 className="text-lg font-semibold mb-4">Filter By Price</h2>

                <div className="flex gap-2 mb-2">
                    <Input 
                        type="number" 
                        placeholder="Enter price" 
                        className="border rounded px-2 py-1 w-full" 
                        value={sliderValue}
                        onChange={handlePriceChange}
                        onKeyDown={handleKeyDown}
                        min="0"
                        max="500000"
                    />
                    <Button 
                        onClick={applyPriceFilter}
                        className="w-full"
                    >
                        Apply
                    </Button>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Filter</h2>
                    {searchParams.toString().length > 0 && (
                        <Button
                            onClick={clearAllFilters}
                            size="sm"
                            className="bg-black hover:bg-gray-700 ml-5"
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Price</h2>
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span>$0</span>
                        <span>$500000</span>
                    </div>
                    <Slider
                        max={500000}
                        step={1}
                        value={[sliderValue]}
                        onValueChange={(value) => {
                            setSliderValue(value[0]);
                            handleSearchQuery("price", value[0]);
                        }}
                        className="w-full"
                    />
                    <p className="text-sm mt-2">Selected Price: ${sliderValue}</p>
                </div>
                
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Product Category</h2>
                    {!isLoading && (
                        <RadioGroup 
                            className="space-y-2"
                            value={selectedCategory || ""}
                        >
                            {categories?.map((category: { _id: string; name: string }) => (
                                <div key={category._id} className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        onClick={() => {
                                            setSelectedCategory(category._id);
                                            handleSearchQuery("category", category._id);
                                        }}
                                        value={category._id}
                                        id={category._id}
                                    />
                                    <Label
                                        htmlFor={category._id}
                                        className="text-gray-500 font-light"
                                    >
                                        {category.name}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    )}
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Brands</h2>
                    {!isLoading && (
                        <RadioGroup 
                            className="space-y-2"
                            value={selectedBrand || ""}
                        >
                            {brands?.map((brand: { _id: string; name: string }) => (
                                <div key={brand._id} className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        onClick={() => {
                                            setSelectedBrand(brand._id);
                                            handleSearchQuery("brand", brand._id);
                                        }}
                                        value={brand._id}
                                        id={brand._id}
                                    />
                                    <Label htmlFor={brand._id} className="text-gray-500 font-light">
                                        {brand.name}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    )}
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Rating</h2>
                    <RadioGroup 
                        className="space-y-3"
                        value={selectedRating || ""}
                    >
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center space-x-2">
                                <RadioGroupItem
                                    onClick={() => {
                                        setSelectedRating(rating.toString());
                                        handleSearchQuery("rating", rating);
                                    }}
                                    value={`${rating}`}
                                    id={`rating-${rating}`}
                                />
                                <Label htmlFor={`rating-${rating}`} className="flex items-center">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Star
                                            size={18}
                                            key={i}
                                            fill={i < rating ? "orange" : "lightgray"}
                                            stroke={i < rating ? "orange" : "lightgray"}
                                        />
                                    ))}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>        
            </CardContent>
        </Card>
    )
}

export default FilterSidbar