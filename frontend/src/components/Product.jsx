import React from "react";
import { products } from "./products";

const Product = () => {
  return (
    <div className="grid grid-cols-4 gap-2 mx-5 mt-5">
      {products.map((prod, index) => (
        <>
          <div key={prod.id} className=" flex flex-col">
            <div>
              <img
                src={prod.image}
                alt={prod.name}
                className=" stationimage object-cover overflow-hidden w-[300px]  h-[200px] rounded-md"
              />
            </div>
            <div className="flex justify-between items-center text-sm pb-4">
              <p className="py-2">{prod.name}</p>
              <p>
                {" "}
                <span className="text-[#00ffff] font-bold text-[16px]">
                  {prod.price}
                </span>{" "}
                ETB
              </p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Product;
