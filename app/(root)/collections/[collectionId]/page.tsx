import HeartFavourite from "@/components/HeartFavourite";
import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);
  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <Image
        src={collectionDetails.image}
        width={1500}
        height={1000}
        alt="collection"
        className="w-full h-[400px] object-cover rounded-xl"
      />
      <p className="text-heading3-bold text-grey-2">{collectionDetails.title}</p>
      <p className="text-body-normal text-grey-2 text-center max-w-[900px]">
        {collectionDetails.description}
      </p>
      <div className="flex flex-wrap gap-12">
        {collectionDetails.products.map((product: ProductType) => (
            <ProductCard product={product} key={product._id}/>
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic"
