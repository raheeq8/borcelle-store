import HeartFavourite from "@/components/HeartFavourite";
import { getSearchProducts } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/search/${params.query}`
  // );
  // const searchProducts = await res.json();
  const searchProducts = await getSearchProducts(params.query)
  const decodedQuery = decodeURIComponent(params.query)
  return (
    <div className="px-10 py-5">
      <p className="text-body-bold">Search results for {decodedQuery}</p>
      {!searchProducts ||
        (searchProducts.length === 0 && (
          <p className="text-body-bold my-5">No result found</p>
        ))}
      <div className="flex flex-wrap justify-center gap-16">
        {searchProducts?.map((product: any) => (
          <Link
            href={`/products/${product._id}`}
            className="h-[220px] flex flex-col gap-2"
            key={product._id}
          >
            <Image
              src={product.media[0]}
              alt="product"
              width={250}
              height={300}
              className="h-[250px] rounded-lg object-cover"
            />
            <div>
              <p className="text-base-bold">{product.title}</p>
              <p className="text-small-medium text-grey-2">
                {product.category}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-body-bold">{product.price["$numberDecimal"]}</p>
              <HeartFavourite product={product} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export const dynamic = "force-dynamic"

export default SearchPage;