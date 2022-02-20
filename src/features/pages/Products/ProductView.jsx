import React from "react";
import { useParams } from "react-router-dom";

function ProductView() {

  const {id} = useParams();

  return (
    <>
      Product View {id}
    </>
  );
}

export default ProductView;