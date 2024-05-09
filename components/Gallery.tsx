'use client'
import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
    const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <Image
        src={mainImage}
        alt="product"
        width={500}
        height={500}
        className="h-96 w-96 rounded-lg shadow-xl object-cover"
      />
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {productMedia.map((image, i) => (
          <Image
            src={image}
            alt="product"
            height={200}
            width={200}
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${mainImage === image ? "border-2 border-black":""}`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
