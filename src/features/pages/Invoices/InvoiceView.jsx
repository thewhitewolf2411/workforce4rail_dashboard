import React from "react";
import { useParams } from "react-router-dom";

function InvoiceView() {

  const {id} = useParams();

  return (
    <>
      Invoice View {id}
    </>
  );
}

export default InvoiceView;