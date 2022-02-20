import React from "react";
import ObjectsContainer from "../../../app/common/ObjectsContainer";

function Clients() {

  const DUMMY_CLIENTS = [
    {
      name:'Client 1',
      creation_date:'19.02.2022',
      number_of_invoices: '5',
    },
    {
      name:'Client 2',
      creation_date:'19.02.2022',
      number_of_invoices: '5',
    },
    {
      name:'Client 3',
      creation_date:'19.02.2022',
      number_of_invoices: '5',
    },
    {
      name:'Client 4',
      creation_date:'19.02.2022',
      number_of_invoices: '5',
    },
  ]

  return (
    <>
      <div className="left__elements">
        <ObjectsContainer data={DUMMY_CLIENTS}/>
      </div>
      <div className="right__elements">
        <ObjectsContainer data={DUMMY_CLIENTS}/>
        <ObjectsContainer data={DUMMY_CLIENTS}/>
      </div>
    </>
  );
}

export default Clients;