import React from "react";

const TotalCount = ({ item, count }) => {
  return (
    <h4>
      {item} (Total : {count})
    </h4>
  );
};

export default TotalCount;
