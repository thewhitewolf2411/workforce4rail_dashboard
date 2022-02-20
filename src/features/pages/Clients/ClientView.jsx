import React from "react";
import { useParams } from "react-router-dom";

function ClientView() {

  const {id} = useParams();

  return (
    <>
      Client View {id}
    </>
  );
}

export default ClientView;