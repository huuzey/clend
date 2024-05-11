import React, { useEffect, useRef, useState } from "react";
import SlotCounter from "react-slot-counter";

import { products } from "./products";

const Product = () => {
  const [inViewport, setInViewport] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on whether the component is in the viewport
        setInViewport(entry.isIntersecting);
      }
      // {
      //   // Optionally configure the root, rootMargin, and threshold
      //   root: null,
      //   rootMargin: "0px",
      //   threshold: 0.1, // Intersection ratio at which the callback should be executed
      // }
    );

    // Start observing the component
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    // Cleanup function to disconnect the observer when component unmounts
    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);
  return (
    <div className="grid grid-cols-4 gap-2 mx-5 mt-5">
      {products.map((prod) => (
        <>
          <div key={prod.id} className=" flex proddesc flex-col relative">
            <p className="absolute z-10 p-3 text-sm descpro top-1 left-0 text-[#00ffff] ">
              {prod.description}
            </p>
            <div className="-z-0">
              <img
                src={prod.image}
                alt={prod.name}
                className=" stationimage prodimg object-cover overflow-hidden w-[300px]  h-[200px] rounded-md"
              />
            </div>
            <div className="flex justify-between items-center text-sm pb-4">
              <p className="py-2">{prod.name}</p>
              <p>
                {" "}
                <div
                  ref={componentRef}
                  className=" text-[#00ffff] font-bold text-[16px]"
                >
                  {inViewport && <SlotCounter value={prod.price} />}
                </div>
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
