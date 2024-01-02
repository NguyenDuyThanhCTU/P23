import React from "react";
import ProductCard from "./ProductCard";

const DisplayProduct = ({ Data }: any) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {Data.map((item: any, index: number) => (
          <div key={index}>
            <ProductCard Data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayProduct;
