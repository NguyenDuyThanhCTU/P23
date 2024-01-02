import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeDisplayProduct = ({ Data }: any) => {
  return (
    <Link href={`/chi-tiet-san-pham/${Data.url}`}>
      <div className="cursor-pointer hover:underline py-10">
        <h2 className="text-[24px] uppercase text-blue-500 font-normal">
          {Data.title}
        </h2>
        <p className="text-redPrimmary font-normal"> {Data.price}</p>
      </div>
      <div className="grid p:grid-cols-2 d:grid-cols-4">
        <Image src={Data.image} alt="Product" width={400} height={300} />
      </div>
      <div className="grid  p:grid-cols-2 d:grid-cols-4 gap-2 mt-5">
        {Data.subimage.map((item: any, index: number) => (
          <div key={index}>
            <Image
              src={item.url}
              alt="product"
              width={400}
              height={300}
              className="p:h-[200px] d:h-[300px] object-cover"
            />
          </div>
        ))}
      </div>
    </Link>
  );
};

export default HomeDisplayProduct;
