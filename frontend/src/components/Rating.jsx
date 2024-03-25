import React from "react";

const Rating = (rate) => {
  //   const addition = rate?.map((rat) => arr.push(rat.value));
  const result = rate?.reduce(function (res, item) {
    return Number(res) + Number(item.value);
  }, 0);
  const added = result / rate?.length;
  console.log(
    "rate",
    rate,
    "result",
    result,

    "added",
    added.toFixed(0)
  );

  return added.toFixed(0);
};

export default Rating;
