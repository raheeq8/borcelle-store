"use client";
import useCart from "@/lib/useHook";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserIcon, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const cart = useCart();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="logo" width={130} height={100} />
      </Link>
      <div className="flex gap-4 text-base-bold max-lg:hidden">
        <Link href={"/"} className={`hover:text-red-1 ${pathname === '/' && 'text-red-1'}`}>
          Home
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`hover:text-red-1 ${pathname === '/wishlist' && 'text-red-1'}`}
        >
          Wishlist
        </Link>
        <Link href={user ? "/orders" : "/sign-in"} className={`hover:text-red-1 ${pathname === '/orders' && 'text-red-1'}`}>
          Orders
        </Link>
      </div>

      <div className="flex gap-3 border border-gray-900 px-3 py-1 items-center rounded-lg">
        <input
          className="max-sm:max-w-[120px] outline-none"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button disabled={query === ""} onClick={() => router.push(`/search/${query}`)}>
        <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
        </button>
      </div>

      <div className="flex relative gap-3 items-center">
        <Link
          href={"/cart"}
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-lg:hidden"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>
        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-12 right-2 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">
            <Link href={"/"} className="hover:text-red-1">
              Home
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="hover:text-red-1"
            >
              Wishlist
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="hover:text-red-1"
            >
              Orders
            </Link>
            <Link
              href={"/cart"}
              className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
            </Link>
          </div>
        )}
        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href={"/sign-in"}>
            <CircleUserIcon />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
