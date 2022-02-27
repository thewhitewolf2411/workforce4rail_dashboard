import React, { useState } from "react";
import { useNavigate } from "react-router";
import PageHeader from "../../../app/common/PageHeader";
import Table from "../../../app/common/table/Table";
import TableController from "../../../app/common/table/TableController";

function Invoices() {

  const [numberOfResults, setNumberOfResults] = useState(10);
  const [page, setPage] = useState(1);
  const [rowSelected, setRowSelected] = useState(0);

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/invoice/' + rowSelected);
  }

  const handleSelect = (id) => {
    if(rowSelected === id){
      setRowSelected(0);
    }
    else{
      setRowSelected(id);
    }
  }

  const handleDeleteClick = () => {
    console.log(rowSelected);
  }

  const DUMMY_INVOICES = [
    {
      id: 1,
      clientName:'Client 1',
      invoiceDate:'19.02.2022',
      paymentDeadline:'19.02.2022',
      isPaid:'Yes',
      invoiceTotal: '10000€',
      invoicedServices: '5'
    },
    {
      id: 2,
      clientName:'Client 2',
      invoiceDate:'19.02.2022',
      paymentDeadline:'19.02.2022',
      isPaid:'Yes',
      invoiceTotal: '10000€',
      invoicedServices: '5'
    },
    {
      id: 3,
      clientName:'Client 3',
      invoiceDate:'19.02.2022',
      paymentDeadline:'19.02.2022',
      isPaid:'Yes',
      invoiceTotal: '10000€',
      invoicedServices: '5'
    },
    {
      id: 4,
      clientName:'Client 4',
      invoiceDate:'19.02.2022',
      paymentDeadline:'19.02.2022',
      isPaid:'Yes',
      invoiceTotal: '10000€',
      invoicedServices: '5'
    },
    {
      id: 5,
      clientName:'Client 5',
      invoiceDate:'19.02.2022',
      paymentDeadline:'19.02.2022',
      isPaid:'Yes',
      invoiceTotal: '10000€',
      invoicedServices: '5'
    },
  ];

  const TABLE_HEADERS = [
    'Client Name',
    'Invoice Date',
    'Payment deadline',
    'Is paid',
    'Invoice total',
    'Number of services'
  ]

  return (
    <div className='invoices__list'>
      <PageHeader viewClient={handleViewClick} deleteClient={handleDeleteClick} buttonsDisabled={rowSelected === 0 ? true : false}/>
      
      <Table headers={TABLE_HEADERS} invoices={DUMMY_INVOICES} setRowSelected={handleSelect} rowSelected={rowSelected}/>
      
      <TableController numberOfResults={numberOfResults} page={page} setNumberOfResults={setNumberOfResults} setPage={setPage} />
    </div>
  );
}

export default Invoices;