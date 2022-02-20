import React from "react";
import PageHeader from "../../../app/common/PageHeader";

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
    <div className='client__list'>
      <PageHeader />
    </div>
  );
}

export default Clients;