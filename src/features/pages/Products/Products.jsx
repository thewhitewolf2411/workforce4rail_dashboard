import React, { useState } from "react";
import { useNavigate } from "react-router";
import PageHeader from "../../../app/common/PageHeader";
import Table from "../../../app/common/table/Table";
import TableController from "../../../app/common/table/TableController";

function Products() {

  const [numberOfResults, setNumberOfResults] = useState(10);
  const [page, setPage] = useState(1);
  const [rowSelected, setRowSelected] = useState(0);

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/product/' + rowSelected);
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

  const DUMMY_PRODUCTS = [
    {
      id: 1,
      productName:'Manufacturing Cables',
      productHourlyRate:'100€',
      totalNumberofInvoices: '10',
      totalEarnings:'10000€'
    },
    {
      id: 2,
      productName:'Railroad work',
      productHourlyRate:'100€',
      totalNumberofInvoices: '10',
      totalEarnings:'10000€'
    },
    {
      id: 3,
      productName:'Welding',
      productHourlyRate:'100€',
      totalNumberofInvoices: '10',
      totalEarnings:'10000€'
    },
    {
      id: 4,
      productName:'High voltage technicians',
      productHourlyRate:'100€',
      totalNumberofInvoices: '10',
      totalEarnings:'10000€'
    },
    {
      id: 5,
      productName:'Machine renting',
      productHourlyRate:'100€',
      totalNumberofInvoices: '10',
      totalEarnings:'10000€'
    },
  ];

  const TABLE_HEADERS = [
    'Product/Service Name',
    'Product Hourly Rate [€]',
    'Total Number of invoices',
    'Total Earnings'
  ]

  return (
    <div className='products__list'>
      <PageHeader viewClient={handleViewClick} deleteClient={handleDeleteClick} buttonsDisabled={rowSelected === 0 ? true : false}/>
      
      <Table headers={TABLE_HEADERS} products={DUMMY_PRODUCTS} setRowSelected={handleSelect} rowSelected={rowSelected}/>
      
      <TableController numberOfResults={numberOfResults} page={page} setNumberOfResults={setNumberOfResults} setPage={setPage} />
    </div>
  );
}

export default Products;