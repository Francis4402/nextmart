"use client"

import Logo from "@/assets/svgs/Logo";
import { Button } from "../ui/button";
import { Heart, LogOut, ShoppingBag } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logout } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constants";
import { Badge } from "../ui/badge";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";

export default function Navbar() {

  const {user, setIsLoading} = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const products = useAppSelector(orderedProductsSelector);
  
  const handleLogOut = () => {
    setIsLoading(true);
    logout();

    if(protectedRoutes.some(route=> pathname.match(route))) {
      router.push("/");
    }
  }

  return (
    <header className="border-b w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <Link href={"/"}>
          <h1 className="md:text-2xl font-black flex items-center">
            <Logo />
            Next Mart
          </h1>
        </Link>
        <div className="max-w-md md:flex hidden">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full border border-gray-300 rounded-full py-2 px-5"
          />
        </div>
        <nav className="flex gap-2">
          <Button variant="outline" className="rounded-full p-0 size-10 hidden lg:flex">
            <Heart />
          </Button>
          {
            user ? (
              <Link href={"/cart"}>
                <Button variant="outline" className="relative rounded-full p-0 size-10">
                  <ShoppingBag className="size-4" />
                  <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0">
                    {products?.length ?? 0}
                  </Badge>
                </Button>
              </Link>
            ) : ""
          }
          
          {
            user ? (
              <>
                {user?.role === "admin" ? (
                  <Link href={'/create-shop'} className="hidden md:block">
                    <Button variant={"outline"}>Create Shop</Button>
                  </Link>
                ): ""}

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                          <Link href={'/dashboard/profile'}>
                            Profile
                          </Link>
                    </DropdownMenuItem>
                    
                    {user?.role === "admin" ? (
                      <>
                        <DropdownMenuItem className="md:hidden block">
                          <Link href={'/create-shop'}>
                            Create Shop
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={'/dashboard'}>
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    ) : ""}
                    
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogOut}>
                      <LogOut/>
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : <Link href={"/login"}>
                 <Button variant={"outline"}>Login</Button>
              </Link>
          }

        </nav>
      </div>
    </header>
  );
}
