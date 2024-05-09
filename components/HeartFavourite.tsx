'use client'
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface HeartFavouriteProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavourite = ({ product, updateSignedInUser }: HeartFavouriteProps) => {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/users", {
        method: "GET",
      });
      const data = await res.json();
      setIsLiked(data.wishlist.includes(product._id));
      setIsLoading(false);
    } catch (error) {
      console.log(`[user_GET] ${error}`);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLiked = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        setIsLoading(true);
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: product._id }),
        });
        const updatedUser = await res.json();
        setIsLiked(updatedUser.wishlist.includes(product._id));
        updateSignedInUser && updateSignedInUser(updatedUser)
      }
    } catch (error) {
      console.log("[user_POST]", error);
    }
  };
  return (
    <button onClick={handleLiked}>
      <Heart fill={`${isLiked ? "red" : "white"}`} />
    </button>
  );
};

export default HeartFavourite;
