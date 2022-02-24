import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../app/common/PageHeader";
import Table from "./table/Table";
import TableController from "./table/TableController";

function Clients() {

  const [numberOfResults, setNumberOfResults] = useState(10);
  const [page, setPage] = useState(1);
  const [rowSelected, setRowSelected] = useState(0);

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/client/' + rowSelected);
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

  const DUMMY_CLIENTS = [
    {
      id: 1,
      name:'Client 1',
      creationDate:'19.02.2022',
      numberOfInvoices: '5',
    },
    {
      id: 2,
      name:'Client 2',
      creationDate:'19.02.2022',
      numberOfInvoices: '5',
    },
    {
      id: 3,
      name:'Client 3',
      creationDate:'19.02.2022',
      numberOfInvoices: '5',
    },
    {
      id: 4,
      name:'Client 4',
      creationDate:'19.02.2022',
      numberOfInvoices: '5',
    },
  ];

  const TABLE_HEADERS = [
    'Client Name',
    'Creaton Date',
    'Number of invoices'
  ]

  return (
    <div className='client__list'>
      <PageHeader viewClient={handleViewClick} deleteClient={handleDeleteClick} buttonsDisabled={rowSelected === 0 ? true : false}/>
      
      <Table headers={TABLE_HEADERS} data={DUMMY_CLIENTS} setRowSelected={handleSelect} rowSelected={rowSelected}/>

      <TableController numberOfResults={numberOfResults} page={page} setNumberOfResults={setNumberOfResults} setPage={setPage} />
    </div>
  );
}

export default Clients;