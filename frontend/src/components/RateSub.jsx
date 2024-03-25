import React from "react";

const RatSub = (ended, value) => {
  const result = ended?.ended?.reduce(function (res, item) {
    return Number(res) + Number(item.value);
  }, 0);
  const added =
    (Number(result) + Number(value.value)) /
    (Number(ended?.ended?.length) + Number(1));
  console.log(
    "rate",
    ended.ended,
    "result",
    result,

    "added",
    added.toFixed(0)
  );

  return added.toFixed(0);
};

export default RatSub;
